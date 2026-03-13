export function OrderSkeleton() {
  return (
    <div className="glass-panel flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="skeleton h-5 w-40"></div>
        <div className="skeleton h-4 w-10 rounded-full"></div>
      </div>
      <div className="skeleton h-3 w-1/2"></div>
      <div className="skeleton h-3 w-3/4"></div>
      <div className="skeleton h-2 w-full"></div>
      <div className="skeleton h-2 w-5/6"></div>
    </div>
  );
}
