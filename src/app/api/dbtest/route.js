import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDb();
    const admin = db.admin();
    const ping = await admin.ping();
    return NextResponse.json({ ok: 1, ping });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: 0, error: String(e) }, { status: 500 });
  }
}
