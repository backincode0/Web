import Link from "next/link";
import { PricingCard } from "@/components/pricing-card";

const packages = [
  {
    title: "Basic",
    price: "$1,100",
    description: "Perfect for pilots, prototypes, or short-term campaigns.",
    features: ["Rapid kickoff", "Single service", "Email updates"],
    highlight: false
  },
  {
    title: "Standard",
    price: "$1,850",
    description: "Shared roadmap, refinement rounds, and priority handling.",
    features: ["Weekly syncs", "Creative strategy", "Two revisions"],
    highlight: true
  },
  {
    title: "Premium",
    price: "$2,900",
    description: "End-to-end launch wing, dedicated team, concierge support.",
    features: ["Custom roadmap", "Unlimited services", "Success partner"],
    highlight: false
  }
];

export default function PricingPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.5em] text-[color:var(--text-secondary)]">Pricing</p>
        <h1 className="text-4xl font-semibold text-[color:var(--text-primary)]">Transparent packages, scalable collaboration</h1>
        <p className="max-w-3xl text-sm text-[color:var(--text-secondary)]">
          Choose the package that matches your launch tempo. All plans include secure order tracking, notifications,
          and email confirmations.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg) => (
          <PricingCard
            key={pkg.title}
            title={pkg.title}
            price={pkg.price}
            description={pkg.description}
            features={pkg.features}
            highlight={pkg.highlight}
          />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em]"
        >
          Sign up & custom quote
        </Link>
      </div>
    </div>
  );
}
