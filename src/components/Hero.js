import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold">Discover and manage products with ease</h1>
      <p className="mt-3 text-gray-600 dark:text-gray-300">
        Browse public products. Sign in to add your own.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          href="/products"
          className="rounded bg-gray-900 text-white px-4 py-2 text-sm dark:bg-gray-100 dark:text-gray-900"
        >
          View Products
        </Link>
        <Link
          href="/login"
          className="rounded border px-4 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}
