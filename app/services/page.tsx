import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="mb-12">
        <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-secondary)]">Offerings</p>
        <h1 className="text-4xl font-semibold text-[color:var(--text-primary)]">Digital service suites</h1>
        <p className="max-w-2xl text-sm text-[color:var(--text-secondary)]">
          Every service is staffed by specialists and backed by a unified project dashboard for updates, comments,
          and approvals.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <section
            key={service.id}
            id={service.slug}
            className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6 shadow-glow"
          >
            <div className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">{service.icon}</div>
            <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">{service.name}</h2>
            <p className="text-sm text-[color:var(--text-secondary)]">{service.description}</p>
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">{service.examples}</p>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
              <span>Starting at ${service.price}</span>
              <Link href="/auth/signup" className="font-semibold text-[color:var(--text-primary)]">
                Order now
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
