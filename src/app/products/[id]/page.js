import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import ShareButton from "@/components/ShareButton";
import AddToCartButton from "@/components/AddToCartButton";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiTag, FiCheck } from "react-icons/fi";

/* -------- data helpers -------- */
async function fetchProduct(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  const doc = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });
  return doc ? JSON.parse(JSON.stringify(doc)) : null;
}

async function fetchRelated(category, excludeId) {
  if (!category) return [];
  const db = await getDb();
  const items = await db
    .collection("products")
    .find({ category, _id: { $ne: new ObjectId(excludeId) } })
    .sort({ createdAt: -1 })
    .limit(4)
    .toArray();
  return JSON.parse(JSON.stringify(items));
}

/* -------- SEO -------- */
export async function generateMetadata({ params }) {
  const p = await fetchProduct(params.id);
  if (!p) return { title: "Product not found • Simple Store" };
  return {
    title: `${p.name} • Simple Store`,
    description: p.description?.slice(0, 150),
    openGraph: {
      title: p.name,
      description: p.description?.slice(0, 150),
      images: p.imageUrl ? [p.imageUrl] : [],
    },
  };
}

/* -------- page -------- */
export default async function ProductDetailsPage({ params }) {
  const product = await fetchProduct(params.id);
  if (!product) notFound();

  const related = await fetchRelated(product.category, params.id);
  const priceDisplay = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(product.price || 0));

  return (
    <main>
      <Container className="py-6 space-y-6">
        {/* breadcrumb / actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm hover:underline"
            >
              <FiArrowLeft /> Back to products
            </Link>
            {product.category && (
              <Link
                href={`/products?category=${encodeURIComponent(
                  product.category
                )}`}
                className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border bg-white/80 dark:bg-gray-900/70"
              >
                <FiTag />
                {product.category}
              </Link>
            )}
          </div>
          <ShareButton />
        </div>

        {/* main content */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* image */}
          <div className="rounded-2xl border overflow-hidden bg-gray-50 dark:bg-gray-900 animate-[fadeIn_0.4s_ease-out_both]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover aspect-[4/3] transition duration-300 hover:scale-[1.02]"
              />
            ) : (
              <div className="aspect-[4/3] grid place-items-center text-gray-500">
                No image
              </div>
            )}
          </div>

          {/* info */}
          <div className="space-y-4 animate-[fadeIn_0.5s_ease-out_both]">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
              {product.category && (
                <Link
                  href={`/products?category=${encodeURIComponent(
                    product.category
                  )}`}
                  className="md:hidden inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border bg-white/80 dark:bg-gray-900/70"
                >
                  <FiTag />
                  {product.category}
                </Link>
              )}
            </div>

            <div className="text-xl font-semibold">{priceDisplay}</div>

            <p className="text-gray-700 dark:text-gray-300">
              {product.description}
            </p>

            {/* quick bullets */}
            <ul className="grid gap-2 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <FiCheck className="mt-0.5" /> In stock & ready to ship
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-0.5" /> Free 30-day returns
              </li>
              <li className="flex items-start gap-2">
                <FiCheck className="mt-0.5" /> Secure checkout
              </li>
            </ul>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <AddToCartButton name={product.name} />
              <Link
                href="/products"
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Continue shopping
              </Link>
            </div>

            {/* vendor hint */}
            {product.createdBy && (
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Added by {product.createdBy}
              </div>
            )}
          </div>
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="pt-2">
            <h2 className="text-lg font-semibold mb-3">
              Related in {product.category}
            </h2>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {related.map((p, i) => (
                <div
                  key={p._id}
                  className="animate-[fadeIn_0.4s_ease-out_both]"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  );
}
