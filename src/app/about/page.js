export const metadata = { title: "About • Simple Store" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 space-y-4">
      <h1 className="text-3xl font-bold animate-[fadeIn_0.4s_ease-out_both]">
        About
      </h1>
      <p className="text-gray-700 dark:text-gray-300 animate-[fadeIn_0.5s_ease-out_both]">
        Simple Store is a demo app built with Next.js and NextAuth. It showcases
        public product browsing and a protected dashboard to add new products
        after logging in.
      </p>
      <ul className="list-disc pl-6 space-y-1 animate-[fadeIn_0.6s_ease-out_both]">
        <li>Public pages: Home, Products, Product Details, About</li>
        <li>Auth pages: Login, Register</li>
        <li>Protected page: Add Product</li>
      </ul>
    </main>
  );
}
