import Link from "next/link";
import { FiPenTool, FiMonitor, FiHome, FiCompass } from "react-icons/fi";

const ICONS = {
  pen: <FiPenTool />,
  monitor: <FiMonitor />,
  home: <FiHome />,
  compass: <FiCompass />,
};

export default function CategoryCard({ title, icon = "pen", category, desc }) {
  const href = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";
  return (
    <Link
      href={href}
      className="group rounded-2xl border p-5 bg-white dark:bg-gray-900 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 dark:focus:ring-gray-700"
    >
      <div className="flex items-center gap-2">
        <div className="grid place-items-center size-9 rounded-lg border bg-gray-50 dark:bg-gray-800">
          {ICONS[icon]}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      {desc && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
      )}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition">
        Explore →
      </div>
    </Link>
  );
}
