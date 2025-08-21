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
      <main className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-gray-700">Product not found.</p>
        <Link className="text-blue-600 underline" href="/products">
          Back
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="grid gap-6 md:grid-cols-2">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg border object-cover aspect-[4/3] bg-gray-50 dark:bg-gray-900 animate-[fadeIn_0.4s_ease-out_both]"
          />
        ) : (
          <div className="w-full rounded-lg border aspect-[4/3] grid place-items-center text-gray-500 bg-gray-50 dark:bg-gray-900">
            No image
          </div>
        )}
        <div className="space-y-3 animate-[fadeIn_0.45s_ease-out_both]">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {product.description}
          </p>
          <p className="text-xl font-semibold">${product.price}</p>
          <Link className="text-blue-600 underline" href="/products">
            Back to list
          </Link>
        </div>
      </div>
    </main>
  );
}
