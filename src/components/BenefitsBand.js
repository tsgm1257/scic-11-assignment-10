"use client";
import { FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";

const items = [
  { icon: <FiTruck />, title: "Fast shipping", text: "Quick dispatch on business days" },
  { icon: <FiRefreshCw />, title: "Easy returns", text: "Free 30-day returns" },
  { icon: <FiShield />, title: "Secure checkout", text: "Your data stays protected" },
];

export default function BenefitsBand() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={it.title}
          className="rounded-xl border bg-white/70 dark:bg-gray-900/70 backdrop-blur p-4 flex items-start gap-3 animate-[fadeIn_0.35s_ease-out_both]"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="grid place-items-center size-9 rounded-lg border bg-gray-50 dark:bg-gray-800">
            {it.icon}
          </div>
          <div>
            <div className="font-semibold">{it.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{it.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
