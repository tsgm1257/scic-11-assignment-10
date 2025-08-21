"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pager({ totalPages }) {
  const sp = useSearchParams();
  const current = parseInt(sp.get("page") || "1", 10);
  const q = sp.get("q") || "";
  const sort = sp.get("sort") || "newest";
  const perPage = sp.get("perPage") || "12";
  const category = sp.get("category") || "";

  if (totalPages <= 1) return null;

  const hrefFor = (page) => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (sort) p.set("sort", sort);
    if (perPage) p.set("perPage", perPage);
    if (category) p.set("category", category);
    p.set("page", String(page));
    return `/products?${p.toString()}`;
  };

  const start = Math.max(1, current - 2);
  const end = Math.min(totalPages, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <PagerLink
        disabled={current <= 1}
        href={hrefFor(current - 1)}
        aria="Previous page"
      >
        <FiChevronLeft />
      </PagerLink>
      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          className={`px-3 py-1.5 rounded-lg border text-sm ${
            p === current
              ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
              : "hover:bg-gray-50 dark:hover:bg-gray-800"
          }`}
        >
          {p}
        </Link>
      ))}
      <PagerLink
        disabled={current >= totalPages}
        href={hrefFor(current + 1)}
        aria="Next page"
      >
        <FiChevronRight />
      </PagerLink>
    </div>
  );
}

function PagerLink({ disabled, href, children, aria }) {
  if (disabled) {
    return (
      <span
        aria-disabled
        className="px-3 py-1.5 rounded-lg border text-sm opacity-50 cursor-not-allowed"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      aria-label={aria}
      className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {children}
    </Link>
  );
}
