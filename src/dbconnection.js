import { configDotenv } from "dotenv";
import { MongoClient } from "mongodb";
const uri = ""; // Replace with your MongoDB URI
const dbName = "test"; // Replace with your database name
let db = null;

export async function connectToDb() {
  if (db) return db;
  console.log("MongoDB URI:", uri);

  // this.timeout(5000);

  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error; // Re-throw the error so the test fails
  }
}

export async function insertDocument(collectionName, document) {
  const db = await connectToDb();
  const collection = db.collection(collectionName);
  const result = await collection.insertOne(document);
  return result;
}

export async function closeConnection() {
  const db = await connectToDb();
  await db.client.close();
}
