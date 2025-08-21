import {
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiShield,
  FiFeather,
  FiTruck,
  FiCheckCircle,
  FiMail,
  FiPhone,
} from "react-icons/fi";

export const metadata = { title: "About • Simple Store" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-14">
      {/* Hero */}
      <section className="relative rounded-2xl border overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-200/40 to-sky-200/40 blur-2xl dark:from-indigo-500/10 dark:to-sky-500/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-pink-200/40 to-amber-200/40 blur-2xl dark:from-pink-500/10 dark:to-amber-500/10" />

        <div className="relative p-8 md:p-12 animate-[fadeIn_0.4s_ease-out_both]">
          <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs tracking-wide bg-white/70 backdrop-blur dark:bg-gray-900/70">
            <span className="size-2 rounded-full bg-emerald-500" />
            ABOUT US
          </span>

          <h1 className="mt-4 text-3xl md:text-4xl font-bold">
            Thoughtful essentials for everyday living
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
            We curate durable, good-looking goods—gear, stationery, and home
            basics—that balance quality and value. Fewer, better things you’ll
            actually use.
          </p>

          {/* quick stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat icon={<FiAward />} label="Curated items" value="200+" />
            <Stat icon={<FiTrendingUp />} label="Avg. rating" value="4.8/5" />
            <Stat icon={<FiUsers />} label="Happy customers" value="10k+" />
          </div>
        </div>
      </section>

      {/* What drives us */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">What drives us</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Feature
            icon={<FiShield className="text-indigo-600 dark:text-indigo-400" />}
            title="Quality first"
            desc="We pick dependable products with clear specs and honest photos—no gimmicks."
          />
          <Feature
            icon={<FiFeather className="text-emerald-600 dark:text-emerald-400" />}
            title="Conscious choices"
            desc="Where possible, we highlight long-lasting materials and responsible makers."
          />
          <Feature
            icon={<FiTruck className="text-sky-600 dark:text-sky-400" />}
            title="Easy to own"
            desc="Fast dispatch, real-time updates, and simple 30-day returns if it’s not right."
          />
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Our story</h2>
        <ol className="relative ml-4 border-s border-gray-200 dark:border-gray-800">
          <TimelineItem
            year="2023"
            title="We started small"
            text="A small team, a simple idea: fewer, better everyday products that don’t break the bank."
          />
          <TimelineItem
            year="2024"
            title="Growing the catalog"
            text="We expanded categories, added community feedback, and improved order tracking."
          />
          <TimelineItem
            year="Today"
            title="Focus on experience"
            text="Fast, accessible UI with dark mode, and a vendor portal to keep products fresh."
            last
          />
        </ol>
      </section>

      {/* Promise / Policies */}
      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Our promise" icon={<FiCheckCircle />}>
          <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-2">
              <FiCheckCircle className="mt-0.5" /> Only products we’d use
              ourselves
            </li>
            <li className="flex gap-2">
              <FiCheckCircle className="mt-0.5" /> Clear specs & honest pricing
            </li>
            <li className="flex gap-2">
              <FiCheckCircle className="mt-0.5" /> Responsive, human support
            </li>
          </ul>
        </Card>

        <Card title="Shipping & returns" icon={<FiTruck />}>
          <ul className="mt-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex gap-2">
              <FiCheckCircle className="mt-0.5" /> Fast dispatch on business
              days
            </li>
            <li className="flex gap-2">
              <FiCheckCircle className="mt-0.5" /> Free returns within 30 days
            </li>
            <li className="flex gap-2">
              <FiCheckCircle className="mt-0.5" /> Real-time email updates
            </li>
          </ul>
        </Card>
      </section>

      {/* Contact CTA */}
      <section className="rounded-2xl border bg-white dark:bg-gray-900 p-6 md:p-8 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold">Need a hand?</h3>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            We usually reply within one business day. Ask about sizing,
            materials, or your order.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <FiMail /> hello@example.com
          </a>
          <a
            href="tel:+10000000000"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2 text-sm dark:bg-gray-100 dark:text-gray-900"
          >
            <FiPhone /> Call us
          </a>
        </div>
      </section>
    </main>
  );
}

/* ---------- tiny presentational components ---------- */

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-white/70 backdrop-blur p-4 dark:bg-gray-900/70">
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        {icon}
        <span>{label}</span>
      </div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="rounded-2xl border p-5 bg-white dark:bg-gray-900 transition hover:shadow-sm">
      <div className="flex items-center gap-2">
        <div className="grid place-items-center size-9 rounded-lg border bg-gray-50 dark:bg-gray-800">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
    </div>
  );
}

function TimelineItem({ year, title, text, last = false }) {
  return (
    <li className="relative pl-6 py-5">
      <span className="absolute -left-[9px] top-6 size-3 rounded-full bg-gray-300 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-950" />
      {!last && (
        <span className="absolute left-0 top-[28px] h-full w-px bg-gray-200 dark:bg-gray-800" />
      )}
      <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {year}
      </div>
      <div className="font-semibold">{title}</div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{text}</p>
    </li>
  );
}

function Card({ title, icon, children }) {
  return (
    <div className="rounded-2xl border p-5 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-2 font-semibold">
        <span className="grid place-items-center size-8 rounded-lg border bg-gray-50 dark:bg-gray-800">
          {icon}
        </span>
        {title}
      </div>
      {children}
    </div>
  );
}
