from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
import uuid
import time
import httpx
import hashlib
import hmac
import base64
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from typing import Optional, List
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

# ---------------- Email guardrail gate ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


# ---------------- Contact inquiries ----------------
ALLOWED_SERVICES = [
    "Custom Software", "AI Solution", "Web Development", "Mobile Application",
    "Business Automation", "Cloud Solutions", "Digital Transformation", "Other",
]

_rate_bucket = {}


def _rate_limited(ip: str) -> bool:
    now = time.time()
    window = [t for t in _rate_bucket.get(ip, []) if now - t < 600]
    window.append(now)
    _rate_bucket[ip] = window
    return len(window) > 5


class ContactInquiry(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    organization: Optional[str] = Field(default="", max_length=160)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=20)
    service: str
    message: str = Field(min_length=10, max_length=4000)


def inquiry_email_html(doc: dict) -> str:
    rows = "".join(
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px;width:140px;vertical-align:top">{label}</td>'
        f'<td style="padding:8px 16px;color:#0F172A;font-size:14px">{value}</td></tr>'
        for label, value in [
            ("Full Name", escape(doc["name"])),
            ("Organization", escape(doc.get("organization") or "—")),
            ("Email", escape(doc["email"])),
            ("Phone", escape(doc.get("phone") or "—")),
            ("Service Required", escape(doc["service"])),
            ("Project Description", escape(doc["message"]).replace("\n", "<br>")),
        ]
    )
    return (
        '<table role="presentation" width="100%" style="background:#0F111A;padding:32px 0">'
        '<tr><td align="center"><table role="presentation" width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif">'
        '<tr><td style="background:#0057D9;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:bold">'
        'New Inquiry — MR AI Website</td></tr>'
        f'<tr><td style="padding:16px 8px"><table role="presentation" width="100%">{rows}</table></td></tr>'
        '<tr><td style="padding:16px 24px;border-top:1px solid #E2E8F0;color:#64748B;font-size:12px">'
        f'Submitted at {escape(doc["created_at"])} UTC via the MR AI Software Technologies website contact form. '
        'We never ask for passwords or card details by email.</td></tr>'
        '</table></td></tr></table>'
    )


@api_router.get("/")
async def root():
    return {"message": "MR AI Software Technologies API"}


@api_router.post("/contact")
async def create_inquiry(payload: ContactInquiry, request: Request):
    if payload.service not in ALLOWED_SERVICES:
        raise HTTPException(status_code=422, detail="Invalid service selection")
    ip = request.client.host if request.client else "unknown"
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many inquiries. Please try again later.")
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "organization": (payload.organization or "").strip(),
        "email": str(payload.email).strip(),
        "phone": (payload.phone or "").strip(),
        "service": payload.service,
        "message": payload.message.strip(),
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.inquiries.insert_one(doc)
    email_id = await send_email(
        to=OWNER_EMAIL,
        subject="New Inquiry — MR AI Website",
        html=inquiry_email_html(doc),
        reply_to=doc["email"],
    )
    return {"status": "success", "id": doc["id"], "email_delivered": email_id is not None}


ALLOWED_PRODUCTS = [
    "fee-management", "edutech", "healthtech", "commerce", "office", "property", "ai-assistant",
]


class EarlyAccessRequest(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    organization: Optional[str] = Field(default="", max_length=160)
    product: str
    note: Optional[str] = Field(default="", max_length=2000)


@api_router.post("/early-access")
async def create_early_access(payload: EarlyAccessRequest, request: Request):
    if payload.product not in ALLOWED_PRODUCTS:
        raise HTTPException(status_code=422, detail="Invalid product selection")
    ip = request.client.host if request.client else "unknown"
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please try again later.")
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name.strip(),
        "email": str(payload.email).strip(),
        "organization": (payload.organization or "").strip(),
        "product": payload.product,
        "note": (payload.note or "").strip(),
        "status": "new",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.early_access.insert_one(doc)
    html = (
        '<table role="presentation" width="100%" style="background:#0F111A;padding:32px 0">'
        '<tr><td align="center"><table role="presentation" width="600" style="background:#ffffff;border-radius:12px;overflow:hidden;font-family:Arial,sans-serif">'
        '<tr><td style="background:#0057D9;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:bold">'
        'Early Access Request — MR AI Website</td></tr>'
        '<tr><td style="padding:16px 8px"><table role="presentation" width="100%">'
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px;width:140px">Name</td><td style="padding:8px 16px;color:#0F172A;font-size:14px">{escape(doc["name"])}</td></tr>'
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px">Email</td><td style="padding:8px 16px;color:#0F172A;font-size:14px">{escape(doc["email"])}</td></tr>'
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px">Organization</td><td style="padding:8px 16px;color:#0F172A;font-size:14px">{escape(doc["organization"] or "—")}</td></tr>'
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px">Product</td><td style="padding:8px 16px;color:#0F172A;font-size:14px">{escape(doc["product"])}</td></tr>'
        f'<tr><td style="padding:8px 16px;color:#94A3B8;font-size:13px">Note</td><td style="padding:8px 16px;color:#0F172A;font-size:14px">{escape(doc["note"] or "—")}</td></tr>'
        '</table></td></tr>'
        '<tr><td style="padding:16px 24px;border-top:1px solid #E2E8F0;color:#64748B;font-size:12px">'
        f'Submitted at {escape(doc["created_at"])} UTC via the MR AI Software Technologies website. '
        'We never ask for passwords or card details by email.</td></tr>'
        '</table></td></tr></table>'
    )
    email_id = await send_email(
        to=OWNER_EMAIL,
        subject="Early Access Request — MR AI Website",
        html=html,
        reply_to=doc["email"],
    )
    return {"status": "success", "id": doc["id"], "email_delivered": email_id is not None}


@api_router.get("/inquiries")
async def list_inquiries():
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return items


# ---------------- Admin Portal Authentication & Management ----------------

ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@mrai.in")
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin@MR2026!")
ADMIN_TOKEN_SECRET = os.environ.get("ADMIN_TOKEN_SECRET", "mr_ai_secret_super_secure_key_2026_salt")


class AdminLoginRequest(BaseModel):
    username_or_email: str
    password: str


class StatusUpdateRequest(BaseModel):
    status: str


def generate_admin_token(user_identifier: str) -> str:
    exp = int(time.time()) + (86400 * 7)  # 7 days validity
    payload = f"{user_identifier}:{exp}"
    signature = hmac.new(ADMIN_TOKEN_SECRET.encode(), payload.encode(), hashlib.sha256).hexdigest()
    token_bytes = f"{payload}:{signature}".encode()
    return base64.urlsafe_b64encode(token_bytes).decode()


def verify_admin_token(authorization: Optional[str] = Header(None)) -> str:
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    parts = authorization.split(" ")
    token = parts[1] if len(parts) == 2 and parts[0].lower() == "bearer" else authorization
    try:
        raw = base64.urlsafe_b64decode(token.encode()).decode()
        pieces = raw.split(":")
        if len(pieces) != 3:
            raise HTTPException(status_code=401, detail="Invalid token format")
        user_identifier, exp_str, signature = pieces
        if int(exp_str) < time.time():
            raise HTTPException(status_code=401, detail="Session expired. Please login again.")
        expected = hmac.new(ADMIN_TOKEN_SECRET.encode(), f"{user_identifier}:{exp_str}".encode(), hashlib.sha256).hexdigest()
        if not hmac.compare_digest(signature, expected):
            raise HTTPException(status_code=401, detail="Invalid token signature")
        return user_identifier
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=401, detail="Authentication failed")


@api_router.post("/admin/login")
async def admin_login(payload: AdminLoginRequest):
    user_input = payload.username_or_email.strip().lower()
    valid_users = {
        ADMIN_EMAIL.lower(),
        ADMIN_USERNAME.lower(),
        OWNER_EMAIL.lower(),
        "admin@mrai.in",
        "admin"
    }
    if user_input not in valid_users or payload.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid username or password.")
    token = generate_admin_token(user_input)
    return {
        "status": "success",
        "token": token,
        "email": ADMIN_EMAIL,
        "username": ADMIN_USERNAME,
        "name": "MR AI Administrator"
    }


@api_router.get("/admin/me")
async def admin_me(user: str = Depends(verify_admin_token)):
    return {
        "status": "authenticated",
        "user": user,
        "email": ADMIN_EMAIL,
        "username": ADMIN_USERNAME,
        "name": "MR AI Administrator"
    }


@api_router.get("/admin/inquiries")
async def get_admin_inquiries(user: str = Depends(verify_admin_token)):
    items = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.patch("/admin/inquiries/{inquiry_id}")
async def update_inquiry_status(inquiry_id: str, payload: StatusUpdateRequest, user: str = Depends(verify_admin_token)):
    res = await db.inquiries.update_one({"id": inquiry_id}, {"$set": {"status": payload.status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"status": "success", "id": inquiry_id, "updated_status": payload.status}


@api_router.delete("/admin/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: str, user: str = Depends(verify_admin_token)):
    res = await db.inquiries.delete_one({"id": inquiry_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Inquiry not found")
    return {"status": "success", "id": inquiry_id}


@api_router.get("/admin/early-access")
async def get_admin_early_access(user: str = Depends(verify_admin_token)):
    items = await db.early_access.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return items


@api_router.patch("/admin/early-access/{request_id}")
async def update_early_access_status(request_id: str, payload: StatusUpdateRequest, user: str = Depends(verify_admin_token)):
    res = await db.early_access.update_one({"id": request_id}, {"$set": {"status": payload.status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Early access request not found")
    return {"status": "success", "id": request_id, "updated_status": payload.status}


@api_router.delete("/admin/early-access/{request_id}")
async def delete_early_access(request_id: str, user: str = Depends(verify_admin_token)):
    res = await db.early_access.delete_one({"id": request_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Early access request not found")
    return {"status": "success", "id": request_id}


@api_router.get("/admin/stats")
async def get_admin_stats(user: str = Depends(verify_admin_token)):
    total_inquiries = await db.inquiries.count_documents({})
    total_early = await db.early_access.count_documents({})
    new_inquiries = await db.inquiries.count_documents({"status": {"$in": ["new", None]}})
    new_early = await db.early_access.count_documents({"status": {"$in": ["new", None]}})
    return {
        "total_inquiries": total_inquiries,
        "total_early_access": total_early,
        "new_inquiries": new_inquiries,
        "new_early_access": new_early,
    }



app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
