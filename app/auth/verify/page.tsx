"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    })
      .then((res) => {
        if (res.ok) {
          setStatus("success");
          setTimeout(() => router.push("/dashboard"), 1500);
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [params, router]);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-6 py-20">
      {status === "loading" && <p className="text-sm text-[color:var(--text-secondary)]">Verifying your account...</p>}
      {status === "success" && (
        <p className="text-sm text-[color:var(--text-secondary)]">Verified! Redirecting to the dashboard…</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-400">Could not verify. Confirm your link or request a new email.</p>
      )}
    </div>
  );
}
