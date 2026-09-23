const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../_db");
const { verifyAdminToken } = require("./_auth");

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST");
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
    const collection = db.collection("early_access_requests");

    if (req.method === "GET") {
      const items = await collection
        .find({})
        .sort({ created_at: -1 })
        .toArray();

      const normalized = items.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name || "",
        email: doc.email || "",
        phone: doc.phone || "",
        organization: doc.organization || "",
        product: doc.product || "",
        notes: doc.notes || "",
        status: doc.status || "new",
        created_at: doc.created_at || new Date().toISOString(),
      }));

      return res.status(200).json(normalized);
    }

    if (req.method === "PATCH") {
      const id = req.query.id || (req.body && req.body.id);
      const status = req.body && req.body.status;

      if (!id || !status) {
        return res.status(400).json({ error: "id and status are required" });
      }

      let filter;
      try {
        filter = { _id: new ObjectId(id) };
      } catch {
        filter = { _id: id };
      }

      await collection.updateOne(filter, {
        $set: { status, updated_at: new Date().toISOString() },
      });

      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) {
        return res.status(400).json({ error: "id is required" });
      }

      let filter;
      try {
        filter = { _id: new ObjectId(id) };
      } catch {
        filter = { _id: id };
      }

      await collection.deleteOne(filter);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("Early access API error:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};
