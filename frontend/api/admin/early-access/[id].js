const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../../_db");
const { verifyAdminToken } = require("../_auth");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,PUT");
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
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "Early access ID is required" });
    }

    let filter;
    try {
      filter = { _id: new ObjectId(id) };
    } catch {
      filter = { _id: id };
    }

    const { db } = await connectToDatabase();
    const collection = db.collection("early_access_requests");

    if (req.method === "PATCH") {
      const { status } = req.body || {};
      if (!status) {
        return res.status(400).json({ error: "Status is required" });
      }

      await collection.updateOne(filter, {
        $set: { status, updated_at: new Date().toISOString() },
      });

      return res.status(200).json({ success: true, message: "Status updated" });
    }

    if (req.method === "DELETE") {
      await collection.deleteOne(filter);
      return res.status(200).json({ success: true, message: "Deleted" });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Early access ID operation error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};
