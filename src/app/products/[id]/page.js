import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";

async function fetchProduct(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const p = await db.collection("products").findOne({ _id: new ObjectId(id) });
  return p ? JSON.parse(JSON.stringify(p)) : null;
}

export default async function ProductDetailsPage({ params }) {
  const product = await fetchProduct(params.id);

  if (!product) {
    return (
      <main className="p-4">
        <p className="text-gray-700">Product not found.</p>
        <Link className="text-blue-600 underline" href="/products">Back</Link>
      </main>
    );
  }

  return (
    <main className="p-4 space-y-3">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="max-w-md rounded" />
      ) : null}
      <p>{product.description}</p>
      <p className="font-semibold">${product.price}</p>
      <Link className="text-blue-600 underline" href="/products">Back to list</Link>
    </main>
  );
}
