"use client";
import { FiShare2 } from "react-icons/fi";
import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (_) {
      // user cancelled or share not supported—silently ignore
    }
  }

  return (
    <button
      onClick={onShare}
      className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
      aria-label="Share product"
      title="Share"
    >
      <FiShare2 />
      {copied ? "Link copied" : "Share"}
    </button>
  );
}
