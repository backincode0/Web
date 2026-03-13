"use client";

import React, { useState } from "react";

async function submitContact(data: FormData) {
  await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message")
    }),
    headers: { "Content-Type": "application/json" }
  });
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await submitContact(form);
      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="glass-panel flex flex-col gap-6 border border-[color:var(--border)] p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[color:var(--text-secondary)]">Contact</p>
            <h1 className="text-3xl font-semibold text-[color:var(--text-primary)]">Need a partner for your next release?</h1>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Drop us a message and we will respond within one business day. We provide bilingual support for EU and
              North America shifts.
            </p>
          </div>
          <div className="text-sm text-[color:var(--text-secondary)]">
            <p>📍 Warsaw · Remote team</p>
            <p>✉️ hello@wfereger.studio</p>
            <p>📞 +48 123 456 789</p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6">
            <input
              name="name"
              placeholder="Full name"
              required
              className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
            />
            <input
              name="email"
              type="email"
              placeholder="Work email"
              required
              className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
            />
            <textarea
              name="message"
              placeholder="Tell us about your project"
              required
              className="h-28 rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
            />
            <button
              type="submit"
              className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
            >
              Send message
            </button>
            {status === "success" && (
              <p className="text-xs text-[color:var(--text-secondary)]">Message received. We will reply shortly.</p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-400">Something went wrong. Please try again later.</p>
            )}
          </form>
          <div className="glass-panel h-56 rounded-3xl border border-[color:var(--border)] p-6 shadow-glow">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-[#121212] to-[#010101]" />
            <p className="mt-3 text-xs uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">Studio map</p>
            <p className="text-[color:var(--text-secondary)]">Warsaw HQ · Remote team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
