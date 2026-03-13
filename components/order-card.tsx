import { OrderStatus } from "@prisma/client";

interface OrderCardProps {
  title: string;
  description: string;
  status: OrderStatus;
  service: string;
  budget: number;
  deadline: string;
  updatedAt: string;
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "text-yellow-400",
  IN_PROGRESS: "text-accent",
  COMPLETED: "text-green-400"
};

export function OrderCard({ title, description, status, service, budget, deadline, updatedAt }: OrderCardProps) {
  return (
    <div className="glass-panel flex flex-col gap-3 border border-[color:var(--border)] p-6">
      <div className="flex items-baseline justify-between gap-3 text-sm uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
        <span>{service}</span>
        <span className={statusStyles[status]}>{status.replace("_", " ")}</span>
      </div>
      <h4 className="text-2xl font-semibold text-[color:var(--text-primary)]">{title}</h4>
      <p className="text-sm text-[color:var(--text-secondary)]">{description}</p>
      <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-[color:var(--text-secondary)]">
        <span>Budget: ${budget}</span>
        <span>Deadline: {new Date(deadline).toLocaleDateString()}</span>
        <span>Updated: {new Date(updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
