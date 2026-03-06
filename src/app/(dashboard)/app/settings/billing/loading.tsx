export default function BillingLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div>
        <div className="h-8 w-24 rounded bg-bg-elevated" />
        <div className="mt-2 h-4 w-56 rounded bg-bg-elevated" />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="rounded-2xl border border-border-subtle bg-white p-6">
            <div className="h-6 w-32 rounded bg-bg-elevated" />
            <div className="mt-4 h-8 w-24 rounded bg-bg-elevated" />
            <div className="mt-4 flex flex-col gap-2">
              <div className="h-4 w-full rounded bg-bg-elevated" />
              <div className="h-4 w-3/4 rounded bg-bg-elevated" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
