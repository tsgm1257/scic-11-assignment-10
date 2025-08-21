import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST() {
  const db = await getDb();
  const now = new Date();

  const items = [
    {
      name: "Notebook",
      description: "Simple ruled notebook for daily notes.",
      price: 4.99,
      imageUrl:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Pen Set",
      description: "Smooth-writing pens in assorted colors.",
      price: 7.5,
      imageUrl:
        "https://images.unsplash.com/photo-1523246199462-6774fd2ff338?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Backpack",
      description: "Lightweight backpack with multiple pockets.",
      price: 29.99,
      imageUrl:
        "https://images.unsplash.com/photo-1514477917009-389c76a86b68?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Wireless Mouse",
      description: "Ergonomic wireless mouse with silent clicks.",
      price: 19.99,
      imageUrl:
        "https://images.unsplash.com/photo-1607863680107-3b7b4caa97ab?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Mechanical Keyboard",
      description: "Compact mechanical keyboard with tactile switches.",
      price: 79.0,
      imageUrl:
        "https://images.unsplash.com/photo-1511207538754-e85503bc5275?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Desk Lamp",
      description: "Adjustable LED desk lamp with dimmer.",
      price: 24.5,
      imageUrl:
        "https://images.unsplash.com/photo-1490697140457-8aa87cbf8d7e?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Water Bottle",
      description: "Insulated stainless steel bottle, 750ml.",
      price: 16.0,
      imageUrl:
        "https://images.unsplash.com/photo-1541647376583-8934aaf3448a?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Headphones",
      description: "Over-ear headphones with rich bass and comfort fit.",
      price: 59.99,
      imageUrl:
        "https://images.unsplash.com/photo-1518445077425-b92c6e42f3fb?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Phone Stand",
      description: "Adjustable aluminum phone and tablet stand.",
      price: 12.99,
      imageUrl:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "USB-C Hub",
      description: "7-in-1 hub with HDMI and card reader.",
      price: 34.99,
      imageUrl:
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Laptop Sleeve",
      description: 'Protective neoprene sleeve for 13–14" laptops.',
      price: 18.99,
      imageUrl:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
    {
      name: "Desk Mat",
      description: "Large non-slip PU leather desk mat.",
      price: 21.0,
      imageUrl:
        "https://images.unsplash.com/photo-1511467685807-6f91397d6b5d?q=80&w=1200&auto=format&fit=crop",
      createdAt: now,
    },
  ];

  await db.collection("products").insertMany(items);
  return NextResponse.json({ ok: true, inserted: items.length });
}
