import Link from "next/link";
import { FiMail, FiClock } from "react-icons/fi";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-lg">Simple Store</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Everyday goods made to last — from work tools to home comforts. Fair
            prices, fast shipping, and friendly support.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Shop</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/products" className="hover:underline">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/dashboard/add-product" className="hover:underline">
                Vendor Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Help</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:underline">
                Create Account
              </Link>
            </li>
          </ul>
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p className="flex items-center gap-2">
              <FiMail size={16} /> hello@example.com
            </p>
            <p className="flex items-center gap-2">
              <FiClock size={16} /> Mon–Fri, 9am–5pm
            </p>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-4 text-sm text-gray-600 dark:text-gray-300 flex flex-col md:flex-row gap-2 md:gap-4 md:items-center">
          <span>© {year} Simple Store. All rights reserved.</span>
          <span className="opacity-70">
            Prices in USD. Free returns within 30 days.
          </span>
        </div>
      </div>
    </footer>
  );
}
