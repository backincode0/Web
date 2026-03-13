import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--bg)]/80 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-sm text-[color:var(--text-secondary)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} WFEREGER Studio. Crafted for founders who expect clarity.</p>
        <div className="flex gap-4">
          <Link href="/services" className="hover:text-[color:var(--text-primary)]">
            Services
          </Link>
          <Link href="/pricing" className="hover:text-[color:var(--text-primary)]">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-[color:var(--text-primary)]">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
