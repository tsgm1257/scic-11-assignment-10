import { MongoClient } from "mongodb";

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) throw new Error("MONGODB_URI is missing");
if (!dbName) throw new Error("MONGODB_DB is missing");

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { ignoreUndefined: true });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getDb() {
  const c = await clientPromise;
  return c.db(dbName);
}
