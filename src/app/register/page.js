"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) router.push("/login");
    else alert((await res.json()).error || "Register failed");
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <div className="max-w-md mx-auto border rounded-lg p-6 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold">Create account</h2>

        <form onSubmit={onSubmit} className="mt-4 grid gap-3">
          <input
            name="name"
            placeholder="Name (optional)"
            className="border rounded px-3 py-2"
          />
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
            placeholder="Password (min 6)"
            required
            className="border rounded px-3 py-2"
          />
          <button
            disabled={loading}
            className="rounded bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-3 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 underline">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
