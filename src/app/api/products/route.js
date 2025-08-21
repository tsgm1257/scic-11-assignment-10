import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = await getDb();
  const products = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  // Ensure _id is serializable if you ever pass to client components
  const safe = JSON.parse(JSON.stringify(products));
  return NextResponse.json({ products: safe });
}
