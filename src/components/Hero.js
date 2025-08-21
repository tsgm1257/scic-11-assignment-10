import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      <div className="grid gap-8 md:grid-cols-2 items-center">
        {/* Left: text */}
        <div className="animate-[fadeIn_0.5s_ease-out_both]">
          <h1 className="text-3xl md:text-4xl font-bold">
            Discover and manage products with ease
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Browse public products. Login from the navbar to add your own.
          </p>
          <div className="mt-6">
            <Link
              href="/products"
              className="inline-block rounded bg-gray-900 text-white px-4 py-2 text-sm dark:bg-gray-100 dark:text-gray-900"
            >
              View Products
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden border bg-gray-50 dark:bg-gray-900 animate-[fadeIn_0.6s_ease-out_both]">
            <img
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1400&auto=format&fit=crop"
              alt="Store hero"
              className="w-full h-full object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden md:block pointer-events-none">
            <div className="rounded-lg px-3 py-2 text-xs border bg-white/80 dark:bg-gray-800/80 backdrop-blur animate-[floatY_6s_ease-in-out_infinite]">
              New deals every week ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
