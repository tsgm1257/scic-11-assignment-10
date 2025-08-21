"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    // credentials flow will work after we add /register next step
    await signIn("credentials", { email, password, callbackUrl: "/products" });
  }

  return (
    <main style={{ padding: 16 }}>
      <h2>Login</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input name="email" type="email" placeholder="Email (for credentials)" required />
        <input name="password" type="password" placeholder="Password" required />
        <button disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => signIn("google", { callbackUrl: "/" })}>
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
