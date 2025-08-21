import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// GET /api/products  -> public list
export async function GET() {
  const db = await getDb();
  const products = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json({ products: JSON.parse(JSON.stringify(products)) });
}

// POST /api/products -> protected create
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description, price, imageUrl } = await req.json();

  // Manual validation (no zod)
  if (!name || String(name).trim().length < 2) {
    return NextResponse.json({ error: "Name too short" }, { status: 400 });
  }
  if (!description || String(description).trim().length < 10) {
    return NextResponse.json(
      { error: "Description too short" },
      { status: 400 }
    );
  }
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice) || numericPrice < 0) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const db = await getDb();
  const doc = {
    name: String(name).trim(),
    description: String(description).trim(),
    price: numericPrice,
    imageUrl: imageUrl ? String(imageUrl) : null,
    createdBy: session.user?.email || null,
    createdAt: new Date(),
  };

  const result = await db.collection("products").insertOne(doc);
  return NextResponse.json(
    { product: { ...doc, _id: result.insertedId } },
    { status: 201 }
  );
}
