"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      email: form.get("email"),
      password: form.get("password")
    };

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      router.push("/dashboard");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-24">
      <div className="glass-panel flex flex-col gap-2 border border-[color:var(--border)] p-8">
        <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-secondary)]">Login</p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-primary)]">Access the dashboard</h1>
        <p className="text-sm text-[color:var(--text-secondary)]">Track orders, request revisions, and review status updates.</p>
      </div>
      <form onSubmit={handleSubmit} className="glass-panel flex flex-col gap-4 border border-[color:var(--border)] p-6">
        <input
          name="email"
          type="email"
          placeholder="Work email"
          required
          className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
        />
        <button
          type="submit"
          className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
        >
          Login
        </button>
        {status === "error" && (
          <p className="text-xs text-red-400">Unable to authenticate. Check credentials or contact support.</p>
        )}
      </form>
      <div className="glass-panel flex flex-col gap-1 border border-[color:var(--border)] p-6 text-xs text-[color:var(--text-secondary)]">
        <p>
          Need an account? <a className="text-[color:var(--text-primary)] underline" href="/auth/signup">Sign up</a>
        </p>
        <p>
          Forgot password? <a className="text-[color:var(--text-primary)] underline" href="/auth/reset">Reset</a>
        </p>
      </div>
    </div>
  );
}
