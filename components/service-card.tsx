import Link from "next/link";

interface ServiceCardProps {
  name: string;
  description: string;
  icon: string;
  examples: string;
  price: number;
  slug: string;
}

export function ServiceCard({ name, description, icon, examples, price, slug }: ServiceCardProps) {
  return (
    <div className="glass-panel flex flex-col gap-4 p-6 shadow-glow">
      <div className="flex items-center justify-between text-sm uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
        <span>{icon}</span>
        <span>${price}+</span>
      </div>
      <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">{name}</h3>
      <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{description}</p>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--text-primary)]">
        {examples}
      </p>
      <Link
        href={`/services#${slug}`}
        className="mt-auto rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
      >
        Order
      </Link>
    </div>
  );
}
