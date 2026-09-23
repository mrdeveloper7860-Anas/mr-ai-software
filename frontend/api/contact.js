const { connectToDatabase } = require("./_db");

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
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
    const { name, organization, email, phone, service, message } = req.body || {};

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const { db } = await connectToDatabase();
    const doc = {
      name: String(name).trim(),
      organization: organization ? String(organization).trim() : "",
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "",
      service: String(service).trim(),
      message: String(message).trim(),
      status: "new",
      created_at: new Date().toISOString(),
    };

    const result = await db.collection("contact_submissions").insertOne(doc);

    return res.status(200).json({
      success: true,
      id: result.insertedId.toString(),
      message: "Inquiry saved successfully to central database",
    });
  } catch (error) {
    console.error("Error saving contact inquiry:", error);
    return res.status(500).json({
      error: "Internal server error saving inquiry",
      details: error.message,
    });
  }
};
