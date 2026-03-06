import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: "#0A0A0F" }}>
      <Link
        href="/"
        className="mb-8 flex items-center gap-2 font-display text-lg font-bold text-white"
      >
        <span className="text-star">&#9733;</span>
        Stareply
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
