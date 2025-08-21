import ProductCard from "@/components/ProductCard";
import { getDb } from "@/lib/db";

export const revalidate = 0;

async function getProducts() {
  const db = await getDb();
  const items = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return JSON.parse(JSON.stringify(items));
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 space-y-4">
      <h2 className="text-2xl font-bold">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {products.map((p, i) => (
            <div
              key={p._id}
              className="animate-[fadeIn_0.4s_ease-out_both]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
