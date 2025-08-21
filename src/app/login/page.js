"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    await signIn("credentials", { email, password, callbackUrl: "/products" });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="max-w-md mx-auto border rounded-lg p-6 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold">Login</h2>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border rounded px-3 py-2"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border rounded px-3 py-2"
          />
          <button
            disabled={loading}
            className="rounded bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-3 text-sm">
          No account?{" "}
          <Link href="/register" className="text-blue-600 underline">
            Register
          </Link>
        </div>

        <div className="mt-2 text-sm">
          Or sign in with{" "}
          <button
            onClick={() => signIn("google", { callbackUrl: "/products" })}
            className="text-blue-600 underline"
          >
            Google
          </button>
        </div>
      </div>
    </main>
  );
}
