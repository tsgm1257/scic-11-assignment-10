import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST() {
  const db = await getDb();
  const now = new Date();
  const sample = [
    { name: "Notebook", description: "Simple ruled notebook for daily notes.", price: 4.99, createdAt: now },
    { name: "Pen Set", description: "Smooth-writing pens in assorted colors.", price: 7.5, createdAt: now },
    { name: "Backpack", description: "Lightweight backpack with multiple pockets.", price: 29.99, createdAt: now },
  ];
  await db.collection("products").insertMany(sample);
  return NextResponse.json({ ok: true, inserted: sample.length });
}
