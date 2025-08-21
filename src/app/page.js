import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getDb } from "@/lib/db";
import BenefitsBand from "@/components/BenefitsBand";
import CategoryCard from "@/components/CategoryCard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

async function getTopProducts() {
  const db = await getDb();
  const items = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1 })
    .limit(4)
    .toArray();
  return JSON.parse(JSON.stringify(items));
}

export default async function HomePage() {
  const top = await getTopProducts();

  return (
    <main>
      {/* HERO */}
      <Hero />

      {/* BENEFITS BAND */}
      <section className="mx-auto max-w-5xl px-4">
        <BenefitsBand />
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-5xl px-4 py-8 space-y-4">
        <h2 className="text-xl font-semibold">Shop by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <CategoryCard
            title="Stationery"
            icon="pen"
            category="Stationery"
            desc="Notebooks, pens & tools"
          />
          <CategoryCard
            title="Tech"
            icon="monitor"
            category="Tech"
            desc="Peripherals & desk gear"
          />
          <CategoryCard
            title="Home"
            icon="home"
            category="Home"
            desc="Daily essentials"
          />
          <CategoryCard
            title="Outdoors"
            icon="compass"
            category="Outdoors"
            desc="Grab-and-go basics"
          />
        </div>
      </section>

      {/* HIGHLIGHTS (4) */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New & noteworthy</h2>
          <Link
            href="/products"
            className="text-sm inline-flex items-center gap-2 hover:underline"
          >
            View all <FiArrowRight />
          </Link>
        </div>

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

      {/* CTA STRIP */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 dark:from-indigo-950 dark:via-sky-950 dark:to-emerald-950">
          <div className="p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold">
              Ready to find your next favorite?
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Browse the full catalog—fresh arrivals every week.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm dark:bg-gray-100 dark:text-gray-900"
            >
              Shop all products <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
