import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { FeatureCard } from "@/components/feature-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { PricingCard } from "@/components/pricing-card";

const features = [
  {
    title: "Single-source focus",
    description: "One inbox, one dashboard, end-to-end follow-through on every order."
  },
  {
    title: "Guaranteed clarity",
    description: "Timeline previews, weekly check-ins, and direct points of contact."
  },
  {
    title: "Automated delivery",
    description: "We bundle your assets, version history, and QA notes in every release."
  }
];

const testimonials = [
  {
    name: "Dana Marquez",
    role: "Head of Product",
    company: "North Ridge Ventures",
    quote: "The WFEREGER team shipped an entire onboarding experience in two weeks with zero rework."
  },
  {
    name: "Luca Hwang",
    role: "Founder",
    company: "Orbit Labs",
    quote: "Our launch video, thumbnails, and site came together in one sprint—every deadline hit."
  }
];

const previewPackages = [
  {
    title: "Basic",
    price: "$1,100",
    description: "Quick turnaround, standard revisions.",
    features: ["Single service focus", "3-day response", "Email support"]
  },
  {
    title: "Standard",
    price: "$1,650",
    description: "Priority queue, two revisions.",
    features: ["Cross-discipline pairing", "Weekly syncs", "Branded deliverables"]
  },
  {
    title: "Premium",
    price: "$2,600",
    description: "Dedicated pod, resource planning.",
    features: ["Roadmap input", "Unlimited revisions", "Success concierge"]
  }
];

export default async function HomePage() {
  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
    take: 4
  });

  return (
    <main className="gradient-glow min-h-screen">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 text-center">
        <p className="text-xs uppercase text-[color:var(--text-secondary)] tracking-[0.6em]">Digital services</p>
        <h1 className="text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-5xl">
          Build, polish, and launch with one data-driven creative partner.
        </h1>
        <p className="max-w-3xl text-xl text-[color:var(--text-secondary)]">
          Programming, video editing, thumbnails, and experiences united by a single SLA and responsive
          project desk.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth/signup"
            className="rounded-full bg-[color:var(--accent)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
          >
            Create account
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-[color:var(--border)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em]"
          >
            Explore services
          </Link>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 text-left text-sm text-[color:var(--text-secondary)] md:grid-cols-4">
          <div>
            <p className="text-3xl font-semibold text-[color:var(--text-primary)]">382+</p>
            <p>Projects delivered</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[color:var(--text-primary)]">24h</p>
            <p>Average response</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[color:var(--text-primary)]">10+</p>
            <p>Specialized partners</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[color:var(--text-primary)]">99%</p>
            <p>Satisfaction score</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Services</h2>
          <Link href="/services" className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
            View full list
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              name={service.name}
              description={service.description}
              icon={service.icon}
              examples={service.examples}
              price={service.price}
              slug={service.slug}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">Benefits</p>
            <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Precision deliverables</h2>
          </div>
          <p className="max-w-2xl text-sm text-[color:var(--text-secondary)]">
            Every sprint is tracked, every milestone notified. Stakeholders remain informed throughout
            ideation, production, and quality review.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} title={feature.title} description={feature.description} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Stories</h2>
          <Link href="/dashboard" className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
            Browse dashboard
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">Pricing</p>
            <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Packages</h2>
          </div>
          <Link href="/pricing" className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
            Full pricing guide
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {previewPackages.map((pkg, index) => (
            <PricingCard
              key={pkg.title}
              title={pkg.title}
              price={pkg.price}
              description={pkg.description}
              features={pkg.features}
              highlight={index === 1}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">Ready?</p>
        <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">Launch your request</h2>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Create an account, drop your brief, and get notified the moment your project begins.
        </p>
        <Link
          href="/auth/signup"
          className="mx-auto rounded-full bg-[color:var(--accent)] px-8 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
        >
          Start today
        </Link>
      </section>
    </main>
  );
}
