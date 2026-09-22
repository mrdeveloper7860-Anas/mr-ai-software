# MR AI Software Technologies — Corporate Website PRD

## Original Problem Statement
Build a complete, premium, futuristic corporate website for MR AI Software Technologies Private Limited (brand: MR AI), an Indian technology & AI company based in Mahoba, Uttar Pradesh. Must feel like a serious global-caliber technology company with an ORIGINAL identity — deep navy/royal blue/cyan palette with restrained gold accents, Inter typography, bento grids, alternating dark/light sections, custom CSS/SVG visuals (no stock robots), honest labeling (no fake clients, stats, testimonials, certifications or launched products).

## Architecture
- Frontend: React 19 (JSX) + Tailwind CSS + framer-motion + lenis, react-router-dom v7, CRA/craco. Components in `/app/frontend/src/components` (layout, Logo, Reveal, SEO, Marquee, NeuralVisual, AIChatDemo, DashboardMockup), pages in `/app/frontend/src/pages`, shared data in `/app/frontend/src/lib/site.js` (edit contact info/products/founders there).
- Backend: FastAPI `/app/backend/server.py` — `POST /api/contact` (validation, rate-limit 5/10min per IP, stores inquiry in MongoDB `inquiries`, sends notification email via Emergent-managed Resend proxy to OWNER_EMAIL), `GET /api/inquiries`, `GET /api/` health.
- DB: MongoDB via MONGO_URL, DB_NAME from env. Collection: `inquiries`.
- Env: backend/.env holds EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, EMAIL_REPLY_TO, OWNER_EMAIL. Frontend uses REACT_APP_BACKEND_URL.

## User Personas
- Business owners / school & college administrators / clinic managers exploring software or AI help
- Enterprise clients & investors evaluating the company's credibility
- Founders maintaining the site (all content centralized in `src/lib/site.js`)

## Core Requirements (static)
9 routes (/ /solutions /ai-automation /products /portfolio /about /contact /privacy-policy /terms), sticky glass navbar + mobile menu, kinetic hero with masked line reveal + parallax neural SVG, trust strip, bento solutions grid, AI demo chat (simulated, clearly labeled), product ecosystem with honest status tags, flagship MR AI Fee Management dashboard (Demo Data badge), Why MR AI, 5-step process, portfolio with UI CONCEPT/DEMO labels, 4 founders (Mohd Anas Siddiqui, Nafis Mohammad, Sultan Ahmad, Mohammad Azhad — initials avatars only), vision + editorial marquee, CTA band, premium footer with placeholder socials, contact form with validation/loading/success/error, SEO meta + OG + JSON-LD Organization + robots.txt + sitemap.xml + SVG favicon, accessibility (skip link, ARIA, focus states, reduced-motion).

## Implemented
- 2026-07: Full 9-page site, all sections above, lenis smooth scroll, framer-motion reveals, contact form → MongoDB + email to mrdeveloper7860@gmail.com (verified delivered), mobile hamburger, all routes tested via screenshots + curl.
- 2026-07: Product deep-dive pages — /products/:slug for all 7 products (fee-management, edutech, healthtech, commerce, office, property, ai-assistant) with per-product heroes, bespoke CSS/SVG interface mockups (ProductVisual variants: dashboard/campus/clinic/pos/hr/property/assistant), 4-step feature walkthroughs, 6-feature grids, early-access signup (POST /api/early-access → MongoDB `early_access` + email to owner, verified), related-products rail, sitemap entries. Product data lives in src/lib/products.js.

## Verified
- curl POST /api/contact → success, email_delivered: true
- curl POST /api/early-access → success, email_delivered: true; invalid product rejected 422
- UI flows: hero, AI chat preset streaming, flagship dashboard tabs, contact form end-to-end success state, early-access form success state on /products/fee-management, product mockup variants (fee dashboard, property plot map), mobile 390px layout + menu, about/founders, portfolio, privacy policy.

## Backlog / Next Tasks
- P0: Real founder photographs (drop-in image slots ready in About founders grid)
- P0: Real social profile URLs (footer placeholders render as disabled chips)
- P1: Product detail pages per ecosystem product; real portfolio case studies as products ship
- P1: OG share image (1200×630) for richer link previews
- P2: Blog/insights section, admin inbox view for inquiries, analytics dashboard
