"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Admin", href: "/admin" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[color:var(--border)] bg-[color:var(--bg)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-semibold tracking-wide text-[color:var(--text-primary)]">
          WFEREGER
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium tracking-wide text-[color:var(--text-secondary)] lg:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:text-[color:var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="rounded-full border border-transparent bg-[color:var(--text-primary)] px-4 py-2 text-sm font-semibold text-[color:var(--bg)] transition hover:bg-[color:var(--text-secondary)]"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
