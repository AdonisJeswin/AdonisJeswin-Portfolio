import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

export async function saveToMongo(data: {
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  message: string;
}) {
  if (!uri) {
    console.warn("MONGODB_URI is not defined in environment variables. Skipping MongoDB save operation.");
    return null;
  }

  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    socketTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });
  try {
    await client.connect();
    const db = client.db("portfolio");
    const collection = db.collection("inquiries");
    
    const result = await collection.insertOne({
      ...data,
      createdAt: new Date(),
    });
    
    console.log("Contact inquiry successfully persisted in MongoDB Atlas:", result.insertedId);
    return result;
  } catch (error) {
    console.error("Failed to persist inquiry in MongoDB Atlas:", error);
    throw error;
  } finally {
    await client.close();
  }
}
