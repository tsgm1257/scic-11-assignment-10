import ProductCard from "@/components/ProductCard";
import { getDb } from "@/lib/db";

export const revalidate = 0; // always fresh during dev

async function getProducts() {
  const db = await getDb();
  const items = await db.collection("products").find({}).sort({ createdAt: -1 }).toArray();
  return JSON.parse(JSON.stringify(items)); // stringify to make _id serializable
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products yet.</p>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </main>
  );
}
