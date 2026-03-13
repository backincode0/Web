import { motion } from "framer-motion";

export function LoadingScreen({ label = "Loading" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-[color:var(--bg-muted)]"
    >
      <div className="h-20 w-20 animate-spin rounded-full border-4 border-t-[color:var(--accent)]"></div>
      <p className="text-sm uppercase tracking-[0.4em] text-[color:var(--text-secondary)]">{label}</p>
    </motion.div>
  );
}
