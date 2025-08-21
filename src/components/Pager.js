import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pager({ totalPages }) {
  const { headers } = require("next/headers");
  const url = new URL(headers().get("x-url") || "http://localhost");
  const current = parseInt(url.searchParams.get("page") || "1", 10);
  const q = url.searchParams.get("q") || "";
  const sort = url.searchParams.get("sort") || "newest";
  const perPage = url.searchParams.get("perPage") || "12";
  const category = url.searchParams.get("category") || ""; // NEW

  function hrefFor(page) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (sort) p.set("sort", sort);
    if (perPage) p.set("perPage", perPage);
    if (category) p.set("category", category); // NEW
    p.set("page", String(page));
    return `/products?${p.toString()}`;
  }

  if (totalPages <= 1) return null;

  const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, current - 3),
    Math.max(0, current - 3) + 5
  );

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      <PagerLink
        disabled={current <= 1}
        href={hrefFor(current - 1)}
        aria="Previous page"
      >
        <FiChevronLeft />
      </PagerLink>
      {pagesToShow.map((p) => (
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
  if (disabled)
    return (
      <span
        aria-disabled
        className="px-3 py-1.5 rounded-lg border text-sm opacity-50 cursor-not-allowed"
      >
        {children}
      </span>
    );
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
