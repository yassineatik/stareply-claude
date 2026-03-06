export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div>
        <div className="h-8 w-48 rounded bg-bg-elevated" />
        <div className="mt-2 h-4 w-64 rounded bg-bg-elevated" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-2xl border border-border-subtle bg-white p-6">
            <div className="h-7 w-12 rounded bg-bg-elevated" />
            <div className="mt-2 h-4 w-24 rounded bg-bg-elevated" />
          </div>
        ))}
      </div>
      <div>
        <div className="h-6 w-36 rounded bg-bg-elevated" />
        <div className="mt-4 rounded-2xl border border-border-subtle bg-white p-6">
          <div className="h-20 w-full rounded bg-bg-elevated" />
        </div>
      </div>
    </div>
  );
}
