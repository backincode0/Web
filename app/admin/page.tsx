\"use client";

import type { OrderStatus } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";

interface AdminOrder {
  id: number;
  title: string;
  status: OrderStatus;
  owner: { email: string };
  service: { name: string };
  updatedAt: string;
}

const statusCycle: OrderStatus[] = ["PENDING", "IN_PROGRESS", "COMPLETED"];

export default function AdminPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const counts = { PENDING: 0, IN_PROGRESS: 0, COMPLETED: 0 };
    orders.forEach((order) => {
      counts[order.status as keyof typeof counts] += 1;
    });
    return counts;
  }, [orders]);

  const uniqueClients = useMemo(() => {
    const emails = new Set<string>();
    orders.forEach((order) => emails.add(order.owner.email));
    return Array.from(emails);
  }, [orders]);

  const changeStatus = async (order: AdminOrder) => {
    const nextIndex = (statusCycle.indexOf(order.status) + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIndex];
    const response = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id, status: nextStatus })
    });
    if (response.ok) {
      const data = await response.json();
      setOrders((prev) => prev.map((o) => (o.id === data.id ? data : o)));
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-secondary)]">Admin dashboard</p>
        <h1 className="text-4xl font-semibold text-[color:var(--text-primary)]">Manage orders & clients</h1>
      </div>
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="glass-panel rounded-3xl border border-[color:var(--border)] p-6 text-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">{label.replace("_", " ")}</p>
            <p className="text-3xl font-semibold text-[color:var(--text-primary)]">{value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-4">
          {loading && <p className="text-sm text-[color:var(--text-secondary)]">Loading orders…</p>}
          {!loading &&
            orders.map((order) => (
              <div
                key={order.id}
                className="glass-panel flex flex-col gap-3 border border-[color:var(--border)] p-6 shadow-glow"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
                  <span>{order.service.name}</span>
                  <span>{order.status.replace("_", " ")}</span>
                </div>
                <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">{order.title}</h3>
                <p className="text-[color:var(--text-secondary)]">Client: {order.owner.email}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-[color:var(--text-secondary)]">Updated {new Date(order.updatedAt).toLocaleString()}</p>
                  <button
                    onClick={() => changeStatus(order)}
                    className="rounded-full border border-[color:var(--border)] px-4 py-2 text-[0.65rem] uppercase tracking-[0.4em]"
                  >
                    Advance status
                  </button>
                </div>
              </div>
            ))}
          {!loading && orders.length === 0 && (
            <p className="text-sm text-[color:var(--text-secondary)]">No live orders yet.</p>
          )}
        </div>
        <div className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">Clients</h2>
          <ul className="text-sm text-[color:var(--text-secondary)]">
            {uniqueClients.map((email) => (
              <li key={email} className="truncate">
                {email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
