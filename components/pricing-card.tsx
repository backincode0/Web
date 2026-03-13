import Link from "next/link";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

export function PricingCard({ title, price, description, features, highlight }: PricingCardProps) {
  return (
    <div
      className={`glass-panel flex flex-col gap-4 p-6 transition ${
        highlight ? "border border-[color:var(--accent)] shadow-lg" : "border border-[color:var(--border)]"
      }`}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">{title}</p>
        <h3 className="text-4xl font-semibold text-[color:var(--text-primary)]">{price}</h3>
      </div>
      <p className="text-sm text-[color:var(--text-secondary)]">{description}</p>
      <ul className="flex flex-col gap-2 text-sm text-[color:var(--text-secondary)]">
        {features.map((feature) => (
          <li key={feature} className="relative pl-4 before:absolute before:left-0 before:top-1 before:h-1 before:w-1 before:rounded-full before:bg-[color:var(--accent)]">
            {feature}
          </li>
        ))}
      </ul>
      <Link
        href="/pricing"
        className="mt-auto rounded-full bg-[color:var(--accent)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
      >
        Choose plan
      </Link>
    </div>
  );
}
