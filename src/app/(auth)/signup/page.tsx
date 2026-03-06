"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/app`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/app");
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        {/* Mobile logo */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 font-display text-lg font-bold text-text-primary lg:hidden"
        >
          <span className="text-star">&#9733;</span>
          STAREPLY
        </Link>
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-text-secondary font-body">
          Start replying to reviews in under 2 minutes.
        </p>
      </div>

      {error && (
        <div className="rounded-[var(--radius-md)] border border-error/30 bg-error/10 px-4 py-3 text-sm text-error font-body">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="At least 6 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          autoComplete="new-password"
        />
        <Button type="submit" loading={loading} className="w-full mt-2">
          Create Account
        </Button>
      </form>

      <p className="text-center text-xs text-text-muted font-body">
        By creating an account, you agree to our{" "}
        <Link href="/terms" className="text-text-secondary hover:text-text-primary underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-text-secondary hover:text-text-primary underline">
          Privacy Policy
        </Link>
        .
      </p>

      <p className="text-center text-sm text-text-secondary font-body">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:text-accent-bright font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
