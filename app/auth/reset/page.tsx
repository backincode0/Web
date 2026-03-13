"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPage() {
  const params = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    const form = new FormData(event.currentTarget);
    await fetch("/api/auth/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") })
    });
    setStatus("success");
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/password-reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: form.get("password") })
    });

    setStatus(response.ok ? "success" : "error");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-24">
      <div className="glass-panel flex flex-col gap-2 border border-[color:var(--border)] p-8">
        <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-secondary)]">Password reset</p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-primary)]">Reset your access</h1>
        <p className="text-sm text-[color:var(--text-secondary)]">
          We will email a secure link to reset your password.
        </p>
      </div>

      {!token && (
        <form onSubmit={handleRequest} className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
          />
          <button
            type="submit"
            className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
          >
            Send reset link
          </button>
          {status === "success" && (
            <p className="text-xs text-[color:var(--text-secondary)]">Check your inbox for the reset link.</p>
          )}
        </form>
      )}

      {token && (
        <form onSubmit={handleReset} className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6">
          <input
            name="password"
            type="password"
            minLength={8}
            required
            placeholder="New password"
            className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
          />
          <button
            type="submit"
            className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
          >
            Reset password
          </button>
          {status === "success" && (
            <p className="text-xs text-[color:var(--text-secondary)]">Password updated. Log in to continue.</p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-400">Could not reset. Token may be invalid or expired.</p>
          )}
        </form>
      )}
    </div>
  );
}
