"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password")
    };

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("success");
      router.push("/dashboard");
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-24">
      <div className="glass-panel flex flex-col gap-2 border border-[color:var(--border)] p-8">
        <p className="text-xs uppercase tracking-[0.6em] text-[color:var(--text-secondary)]">Signup</p>
        <h1 className="text-3xl font-semibold text-[color:var(--text-primary)]">Create your account</h1>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Start placing orders and track progress from the client dashboard.
        </p>
      </div>
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
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="rounded-xl border border-[color:var(--border)] bg-transparent px-4 py-3 text-sm text-[color:var(--text-primary)]"
        />
        <button
          type="submit"
          className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--text-primary)] transition hover:bg-[color:var(--accentDark)]"
        >
          Sign up
        </button>
        {status === "success" && (
          <p className="text-xs text-[color:var(--text-secondary)]">Account created. Redirecting...</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">Could not create account. Try again or contact support.</p>
        )}
      </form>
      <div className="glass-panel flex flex-col gap-1 border border-[color:var(--border)] p-6 text-xs text-[color:var(--text-secondary)]">
        <p>
          Already have an account? <a className="text-[color:var(--text-primary)] underline" href="/auth/login">Login</a>
        </p>
        <p>
          Forgot password? <a className="text-[color:var(--text-primary)] underline" href="/auth/reset">Reset</a>
        </p>
      </div>
    </div>
  );
}
