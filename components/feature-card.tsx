interface FeatureCardProps {
  title: string;
  description: string;
}

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="glass-panel flex flex-col gap-3 rounded-3xl border border-[color:var(--border)] p-6 text-sm">
      <span className="text-xs uppercase tracking-[0.5em] text-[color:var(--text-secondary)]">Feature</span>
      <h4 className="text-2xl font-semibold text-[color:var(--text-primary)]">{title}</h4>
      <p className="text-[color:var(--text-secondary)]">{description}</p>
    </div>
  );
}
