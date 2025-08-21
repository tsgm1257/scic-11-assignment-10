"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

const PER_PAGE = [8, 12, 16, 24];
const CATEGORIES = ["All", "Stationery", "Tech", "Home", "Outdoors"];

export default function ProductsToolbar({
  initialQ,
  initialSort,
  initialPerPage,
  initialCategory,
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(initialQ || "");
  const [sort, setSort] = useState(initialSort || "newest");
  const [perPage, setPerPage] = useState(initialPerPage || 12);
  const [category, setCategory] = useState(initialCategory || "");

  const pushParams = useMemo(
    () => (next) => {
      const params = new URLSearchParams(sp.toString());
      Object.entries(next).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "" || v === "All")
          params.delete(k);
        else params.set(k, String(v));
      });
      params.set("page", "1");
      router.push(`/products?${params.toString()}`, { scroll: false });
    },
    [router, sp]
  );

  useEffect(() => {
    const t = setTimeout(() => pushParams({ q, sort, perPage, category }), 250);
    return () => clearTimeout(t);
  }, [q, sort, perPage, category, pushParams]);

  function onReset() {
    setQ("");
    setSort("newest");
    setPerPage(12);
    setCategory("");
    pushParams({ q: "", sort: "newest", perPage: 12, category: "" });
  }

  return (
    <div className="rounded-2xl border bg-white dark:bg-gray-900 p-4 grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto] md:items-center">
      {/* Search */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          className="w-full border rounded-lg pl-9 pr-8 py-2 bg-white dark:bg-gray-900"
        />
        {q && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
            onClick={() => setQ("")}
            aria-label="Clear"
          >
            <FiX />
          </button>
        )}
      </div>

      {/* Category */}
      <select
        value={category || "All"}
        onChange={(e) =>
          setCategory(e.target.value === "All" ? "" : e.target.value)
        }
        className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
        aria-label="Category"
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
        aria-label="Sort"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      {/* Per page */}
      <select
        value={perPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 bg-white dark:bg-gray-900"
        aria-label="Items per page"
      >
        {PER_PAGE.map((n) => (
          <option key={n} value={n}>
            {n} / page
          </option>
        ))}
      </select>

      <button
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}
