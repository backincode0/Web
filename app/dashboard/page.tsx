\"use client";

import type { OrderStatus } from "@prisma/client";
import { OrderCard } from "@/components/order-card";
import { OrderForm, OrderPayload } from "@/components/order-form";
import { OrderSkeleton } from "@/components/order-skeleton";
import { useEffect, useMemo, useState } from "react";

interface Order {
  id: number;
  title: string;
  description: string;
  status: OrderStatus;
  budget: number;
  deadline: string;
  updatedAt: string;
  service: { name: string };
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [services, setServices] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/orders").then((res) => res.json()),
      fetch("/api/services").then((res) => res.json())
    ])
      .then(([ordersData, servicesData]) => {
        setOrders(ordersData);
        setServices(servicesData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const counts = { Pending: 0, "In progress": 0, Completed: 0 };
    orders.forEach((order) => {
      const key =
        order.status === "IN_PROGRESS"
          ? "In progress"
          : order.status === "COMPLETED"
          ? "Completed"
          : "Pending";
      counts[key as keyof typeof counts] += 1;
    });
    return counts;
  }, [orders]);

  const handleSubmit = async (payload: OrderPayload) => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      setOrders((prev) => [data, ...prev]);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-secondary)]">Client dashboard</p>
        <h1 className="text-4xl font-semibold text-[color:var(--text-primary)]">Track your studio requests</h1>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Orders sync automatically with project owners, and we email you status updates as soon as a milestone
          changes.
        </p>
      </div>

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="glass-panel rounded-3xl border border-[color:var(--border)] p-6 text-sm">
            <p className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">{label}</p>
            <p className="text-3xl font-semibold text-[color:var(--text-primary)]">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="flex flex-col gap-6">
          {loading &&
            Array.from({ length: 3 }).map((_, index) => <OrderSkeleton key={index} />)}
          {!loading && orders.length === 0 && (
            <p className="text-sm text-[color:var(--text-secondary)]">No orders yet. Submit one below.</p>
          )}
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              title={order.title}
              description={order.description}
              status={order.status as any}
              service={order.service.name}
              budget={order.budget}
              deadline={order.deadline}
              updatedAt={order.updatedAt}
            />
          ))}
        </div>
        <OrderForm services={services} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
