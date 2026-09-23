const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || "mrai_database";

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (!uri) {
    throw new Error(
      "MONGO_URL environment variable is not set. Please set it in Vercel project settings."
    );
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
  });

  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;
  return { client, db };
}

module.exports = { connectToDatabase };
