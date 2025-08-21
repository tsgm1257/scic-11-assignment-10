import Link from "next/link";
import { FiCheckCircle, FiLock, FiZap, FiStar } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        <div className="relative md:order-last animate-[fadeIn_0.6s_ease-out_both]">
          <div className="rounded-xl overflow-hidden border bg-gray-50 dark:bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1400&auto=format&fit=crop"
              alt="Browse and shop quality everyday goods"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden md:block pointer-events-none">
            <div className="rounded-lg px-3 py-2 text-xs border bg-white/80 dark:bg-gray-800/80 backdrop-blur animate-[floatY_6s_ease-in-out_infinite] flex items-center gap-1">
              <FiStar size={14} />
              <span>New arrivals weekly</span>
            </div>
          </div>
        </div>

        <div className="animate-[fadeIn_0.5s_ease-out_both]">
          <h1 className="text-3xl md:text-4xl font-bold">
            Thoughtful essentials for everyday living
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Discover well-made gear, stationery, and home basics chosen for
            quality and value. Shop the latest products and keep your favorites
            on hand.
          </p>

          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <FiCheckCircle className="mt-0.5" size={18} /> Curated selection
              with fresh drops
            </li>
            <li className="flex items-start gap-2">
              <FiLock className="mt-0.5" size={18} /> Secure checkout & easy
              returns
            </li>
            <li className="flex items-start gap-2">
              <FiZap className="mt-0.5" size={18} /> Fast, responsive experience
              with dark mode
            </li>
          </ul>

          <div className="mt-6">
            <Link
              href="/products"
              className="inline-block rounded bg-gray-900 text-white px-4 py-2 text-sm dark:bg-gray-100 dark:text-gray-900"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
