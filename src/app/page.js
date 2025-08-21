import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getDb } from "@/lib/db";

async function getTopProducts() {
  const db = await getDb();
  const items = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .limit(4) // <-- 4 highlights
    .toArray();
  return JSON.parse(JSON.stringify(items));
}

export default async function HomePage() {
  const top = await getTopProducts();

  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <h2 className="text-xl font-semibold mb-4">Product Highlights</h2>
        {top.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">
            No products yet. Login and add one!
          </p>
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {top.map((p, i) => (
              <div
                key={p._id}
                className="animate-[fadeIn_0.4s_ease-out_both]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
