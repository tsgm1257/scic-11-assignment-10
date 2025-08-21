"use client";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur dark:bg-gray-900/90">
      <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-bold text-lg">Simple Store</Link>

        <div className="ml-auto flex items-center gap-4">
          <Link href="/products" className="hover:underline">Products</Link>

          {session ? (
            <>
              <Link href="/dashboard/add-product" className="hover:underline">
                Add Product
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="rounded bg-gray-900 text-white px-3 py-1 text-sm dark:bg-gray-100 dark:text-gray-900"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <button
                onClick={() => signIn("google", { callbackUrl: "/products" })}
                className="rounded bg-gray-900 text-white px-3 py-1 text-sm dark:bg-gray-100 dark:text-gray-900"
              >
                Google
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
