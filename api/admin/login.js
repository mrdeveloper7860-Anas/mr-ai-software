const crypto = require("crypto");

const ADMIN_CREDENTIALS = [
  { user: "admin", pass: "Admin@MR2026!" },
  { user: "admin@mrai.in", pass: "Admin@MR2026!" },
  { user: "mrdeveloper7860@gmail.com", pass: "Admin@MR2026!" },
];

const SECRET =
  process.env.ADMIN_TOKEN_SECRET || "mr_ai_secret_super_secure_key_2026_salt";

function createToken(username) {
  const payload = {
    sub: username,
    role: "admin",
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
  };
  const str = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(str).digest("base64url");
  return `${str}.${sig}`;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { username, password } = req.body || {};
    const inputUser = String(username || "").trim().toLowerCase();
    const inputPass = String(password || "").trim();

    const matched = ADMIN_CREDENTIALS.some(
      (c) => c.user.toLowerCase() === inputUser && c.pass === inputPass
    );

    if (!matched) {
      return res.status(401).json({
        error: "Invalid username or password",
      });
    }

    const token = createToken(inputUser);

    return res.status(200).json({
      success: true,
      token,
      user: {
        name: "Mohd Anas Siddiqui",
        email: "mrdeveloper7860@gmail.com",
        role: "Super Admin",
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed", details: error.message });
  }
};
