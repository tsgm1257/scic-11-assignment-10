"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      description: form.get("description"),
      price: form.get("price"),
      imageUrl: form.get("imageUrl")
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    setLoading(false);
    if (res.ok) {
      toast.success("Product added!");
      router.push("/products");
    } else {
      const data = await res.json().catch(() => ({}));
      toast.error(data.error || "Failed to add product");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-lg">
      <input
        name="name"
        placeholder="Product name"
        required
        className="border rounded px-3 py-2"
      />
      <textarea
        name="description"
        placeholder="Description (min 10 chars)"
        required
        rows={4}
        className="border rounded px-3 py-2"
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price"
        required
        className="border rounded px-3 py-2"
      />
      <input
        name="imageUrl"
        placeholder="Image URL (optional)"
        className="border rounded px-3 py-2"
      />
      <button
        disabled={loading}
        className="rounded bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60 dark:bg-gray-100 dark:text-gray-900"
      >
        {loading ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}
