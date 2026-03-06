"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      if (signInError.message.toLowerCase().includes("email")) {
        setEmailError(signInError.message);
      } else {
        setPasswordError(signInError.message);
      }
      setLoading(false);
      return;
    }

    router.push("/app");
  }

  async function handleGoogleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  }

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-bold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-void-100 font-body">
          Sign in to your Stareply account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
            required
            autoComplete="email"
            className={[
              "w-full rounded-[var(--radius-md)] bg-white/[0.05] border px-3.5 py-2.5 text-[15px] text-white placeholder:text-void-400 font-body focus:outline-none transition-all",
              emailError
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-white/[0.10] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30",
            ].join(" ")}
          />
          {emailError && (
            <p className="text-xs text-red-400 mt-1 font-body">{emailError}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span />
            <Link
              href="/forgot-password"
              className="text-xs text-violet-400 hover:text-violet-300 font-body"
            >
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPasswordError(null); }}
            required
            autoComplete="current-password"
            className={[
              "w-full rounded-[var(--radius-md)] bg-white/[0.05] border px-3.5 py-2.5 text-[15px] text-white placeholder:text-void-400 font-body focus:outline-none transition-all",
              passwordError
                ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
                : "border-white/[0.10] focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30",
            ].join(" ")}
          />
          {passwordError && (
            <p className="text-xs text-red-400 mt-1 font-body">{passwordError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-violet-500 px-6 py-3 text-white font-medium font-body transition-all hover:bg-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-void-200 mt-5 font-body">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-violet-400 hover:text-violet-300 font-medium"
        >
          Start free &rarr;
        </Link>
      </p>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-white/[0.08]" />
        <span className="text-xs text-void-400 font-body">or</span>
        <div className="flex-1 h-px bg-white/[0.08]" />
      </div>

      {/* Google SSO */}
      <button
        onClick={handleGoogleSignIn}
        className="w-full inline-flex items-center justify-center gap-3 rounded-[var(--radius-md)] bg-white/[0.05] border border-white/[0.10] px-6 py-3 text-white font-medium font-body transition-all hover:bg-white/[0.08] hover:border-white/[0.15] cursor-pointer"
      >
        <GoogleIcon />
        Continue with Google
      </button>
    </>
  );
}
