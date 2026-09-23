const { connectToDatabase } = require("../_db");
const { verifyAdminToken } = require("./_auth");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (!verifyAdminToken(req)) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const { db } = await connectToDatabase();
    const inqCol = db.collection("contact_submissions");
    const eaCol = db.collection("early_access_requests");

    const [totalInquiries, newInquiries, totalEarlyAccess, newEarlyAccess] =
      await Promise.all([
        inqCol.countDocuments({}),
        inqCol.countDocuments({ status: "new" }),
        eaCol.countDocuments({}),
        eaCol.countDocuments({ status: "new" }),
      ]);

    return res.status(200).json({
      total_inquiries: totalInquiries,
      new_inquiries: newInquiries,
      total_early_access: totalEarlyAccess,
      new_early_access: newEarlyAccess,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};
