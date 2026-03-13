"use client";

import React, { useEffect, useState } from "react";

export type OrderPayload = {
  serviceId: number;
  title: string;
  description: string;
  budget: number;
  deadline: string;
  fileName?: string;
  fileType?: string;
};

interface OrderFormProps {
  services: { id: number; name: string }[];
  onSubmit: (payload: OrderPayload) => Promise<void>;
}

export function OrderForm({ services, onSubmit }: OrderFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    serviceId: services[0]?.id ?? 0
  });
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    await onSubmit({
      serviceId: Number(form.serviceId),
      title: form.title,
      description: form.description,
      budget: Number(form.budget),
      deadline: form.deadline,
      fileName: fileName || undefined
    });
    setForm((prev) => ({
      ...prev,
      title: "",
      description: "",
      budget: "",
      deadline: ""
    }));
    setFileName("");
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6">
      <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">Create new order</h3>
      <label className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
        Service
          <select
            value={form.serviceId}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, serviceId: Number(event.target.value) }))
            }
            disabled={!services.length}
            className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </label>
      <label className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
        Title
        <input
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Describe your deliverable"
          required
          className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text-primary)]"
        />
      </label>
      <label className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
        Description
        <textarea
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Goals, references, assets"
          required
          className="mt-1 h-28 w-full rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text-primary)]"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
          Budget
          <input
            type="number"
            min="0"
            value={form.budget}
            onChange={(event) => setForm((prev) => ({ ...prev, budget: event.target.value }))}
            placeholder="USD"
            required
            className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text-primary)]"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
          Deadline
          <input
            type="date"
            value={form.deadline}
            onChange={(event) => setForm((prev) => ({ ...prev, deadline: event.target.value }))}
            required
            className="mt-1 w-full rounded-xl border border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text-primary)]"
          />
        </label>
        <label className="text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">
          Attachment
          <input
            type="file"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            className="mt-1 w-full rounded-xl border border-dashed border-[color:var(--border)] bg-transparent px-3 py-2 text-sm text-[color:var(--text-primary)]"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={loading || !services.length}
        className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Submit order"}
      </button>
      {!services.length && (
        <p className="text-xs text-[color:var(--text-secondary)]">Services loading…</p>
      )}
      {fileName && <p className="text-xs text-[color:var(--text-secondary)]">Attached: {fileName}</p>}
    </form>
  );

  useEffect(() => {
    if (services.length > 0 && !services.some((service) => service.id === form.serviceId)) {
      setForm((prev) => ({ ...prev, serviceId: services[0].id }));
    }
  }, [services, form.serviceId]);
}
