"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import Container from "./Container";
import { FiMenu } from "react-icons/fi"; // NEW

export default function Navbar() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const NavLinks = () => (
    <>
      <Link href="/products" className="hover:underline">
        Products
      </Link>
      <Link href="/about" className="hover:underline">
        About
      </Link>
      {session ? (
        <>
          <Link href="/dashboard/add-product" className="hover:underline">
            Add Product
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="rounded bg-gray-900 text-white px-3 py-1 text-sm dark:bg-gray-100 dark:text-gray-900"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login"
          onClick={() => setOpen(false)}
          className="rounded bg-gray-900 text-white px-3 py-1 text-sm dark:bg-gray-100 dark:text-gray-900"
        >
          Login
        </Link>
      )}
      <ThemeToggle />
    </>
  );

  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur dark:bg-gray-900/90">
      <Container className="py-3 flex items-center gap-4">
        <Link href="/" className="font-bold text-lg">
          Simple Store
        </Link>

        <div className="ml-auto hidden md:flex items-center gap-3">
          <NavLinks />
        </div>

        {/* Hamburger */}
        <button
          className="ml-auto md:hidden rounded border px-2 py-1 text-sm dark:border-gray-700"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <FiMenu size={18} />
        </button>
      </Container>

      {open && (
        <div className="md:hidden border-t">
          <Container className="py-3 flex flex-col gap-3">
            <NavLinks />
          </Container>
        </div>
      )}
    </header>
  );
}
