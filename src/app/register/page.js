"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || "Register failed");
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h2>Register</h2>
      <form
        onSubmit={onSubmit}
        style={{ display: "grid", gap: 12, maxWidth: 360 }}
      >
        <input name="name" placeholder="Name (optional)" />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6)"
          required
        />
        <button disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </main>
  );
}
