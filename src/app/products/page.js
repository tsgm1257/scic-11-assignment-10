import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import ProductsToolbar from "@/components/ProductsToolbar";
import Pager from "@/components/Pager";
import { getDb } from "@/lib/db";
import { FiBox } from "react-icons/fi";

export const revalidate = 0;

const PER_PAGE_DEFAULT = 12;

function toInt(v, fallback) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}
function buildSort(sortParam) {
  switch (sortParam) {
    case "price_asc":
      return { price: 1, createdAt: -1 };
    case "price_desc":
      return { price: -1, createdAt: -1 };
    case "newest":
    default:
      return { createdAt: -1 };
  }
}

export default async function ProductsPage({ searchParams }) {
  const q = (searchParams?.q || "").trim();
  const sortParam = (searchParams?.sort || "newest").toString();
  const page = toInt(searchParams?.page, 1);
  const perPage = toInt(searchParams?.perPage, PER_PAGE_DEFAULT);
  const category = (searchParams?.category || "").toString(); // NEW

  const filter = {};
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }
  if (category) {
    filter.category = category;
  }

  const db = await getDb();
  const total = await db.collection("products").countDocuments(filter);
  const products = await db
    .collection("products")
    .find(filter)
    .sort(buildSort(sortParam))
    .skip((page - 1) * perPage)
    .limit(perPage)
    .toArray();

  const safeProducts = JSON.parse(JSON.stringify(products));
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <main>
      <Container className="py-6 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Products</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {category && (
                <>
                  Category: <span className="font-medium">{category}</span> •{" "}
                </>
              )}
              {total.toLocaleString()} item{total === 1 ? "" : "s"} • Sorted by{" "}
              <span className="font-medium">{sortParam.replace("_", " ")}</span>
            </p>
          </div>
        </div>

        <ProductsToolbar
          initialQ={q}
          initialSort={sortParam}
          initialPerPage={perPage}
          initialCategory={category} // NEW
        />

        {safeProducts.length === 0 ? (
          <div className="rounded-2xl border bg-white dark:bg-gray-900 p-10 grid place-items-center text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="grid place-items-center size-12 rounded-full border">
                <FiBox />
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                No products found{q ? ` for “${q}”` : ""}.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try a different search or reset filters.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {safeProducts.map((p, i) => (
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

        <Pager totalPages={totalPages} />
      </Container>
    </main>
  );
}
