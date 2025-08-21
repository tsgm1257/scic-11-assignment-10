"use client";
import toast from "react-hot-toast";
import { FiShoppingCart } from "react-icons/fi";

export default function AddToCartButton({ name }) {
  function handleClick() {
    toast(`Cart is not enabled yet - feature coming soon.`, {
      // Use react-icons instead of an emoji:
      icon: <FiShoppingCart size={16} />,
      duration: 2500,
    });
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm dark:bg-gray-100 dark:text-gray-900"
    >
      <FiShoppingCart />
      Add to cart
    </button>
  );
}
