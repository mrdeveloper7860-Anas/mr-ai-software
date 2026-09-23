const { connectToDatabase } = require("./_db");

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
    const { name, email, phone, organization, product, notes } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const { db } = await connectToDatabase();
    const doc = {
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      organization: organization ? String(organization).trim() : "",
      product: product ? String(product).trim() : "Fee Management System",
      notes: notes ? String(notes).trim() : "",
      status: "new",
      created_at: new Date().toISOString(),
    };

    const result = await db.collection("early_access_requests").insertOne(doc);

    return res.status(200).json({
      success: true,
      id: result.insertedId.toString(),
      message: "Early access request submitted successfully",
    });
  } catch (error) {
    console.error("Error saving early access request:", error);
    return res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
};
