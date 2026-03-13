interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
  company: string;
}

export function TestimonialCard({ name, role, quote, company }: TestimonialCardProps) {
  return (
    <div className="glass-panel flex h-full flex-col justify-between gap-4 p-6 text-sm text-[color:var(--text-secondary)]">
      <p className="text-lg italic text-[color:var(--text-primary)]">“{quote}”</p>
      <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
        {name} · {role} @ {company}
      </div>
    </div>
  );
}
