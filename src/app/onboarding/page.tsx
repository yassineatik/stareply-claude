"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════════════════
   Types & Data
   ═══════════════════════════════════════════════════════════════════════ */

interface LocationData {
  id: string;
  display_name: string;
  average_rating: number | null;
  total_reviews: number | null;
}

type OnboardingTone = "friendly" | "professional" | "casual";

const TONES: {
  id: OnboardingTone;
  emoji: string;
  label: string;
  example: string;
}[] = [
  {
    id: "friendly",
    emoji: "\uD83D\uDE0A",
    label: "Friendly",
    example:
      "Thanks so much for the kind words! We loved having you.",
  },
  {
    id: "professional",
    emoji: "\uD83D\uDCBC",
    label: "Professional",
    example:
      "Thank you for your feedback. We appreciate your continued support.",
  },
  {
    id: "casual",
    emoji: "\uD83E\uDD19",
    label: "Casual",
    example:
      "Wow, this made our day! Come back soon, we\u2019ll be here!",
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   Shared UI
   ═══════════════════════════════════════════════════════════════════════ */

function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {[1, 2, 3, 4].map((step) => (
        <div
          key={step}
          className={[
            "rounded-full transition-all duration-300",
            step === current
              ? "w-8 h-2 bg-violet-500"
              : step < current
                ? "w-2 h-2 bg-violet-500/50"
                : "w-2 h-2 bg-void-800",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

function CheckCircleIcon({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function PrimaryButton({
  onClick,
  disabled,
  loading,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-violet-500 px-6 py-3.5 text-white font-medium font-body transition-all hover:bg-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 cursor-pointer"
    >
      {loading && (
        <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
      )}
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Step 1 — Welcome
   ═══════════════════════════════════════════════════════════════════════ */

function Step1({
  onConnect,
  loading,
}: {
  onConnect: () => void;
  loading: boolean;
}) {
  return (
    <div className="animate-fade-up text-center">
      <span className="text-5xl block mb-6">&#11088;</span>
      <h1 className="font-display text-3xl font-bold text-white">
        Let&apos;s get you set up
      </h1>
      <p className="mt-4 text-void-100 text-center max-w-sm mx-auto font-body">
        Takes about 60 seconds. We&apos;ll connect your Google Business Profile
        and you&apos;ll be replying to reviews right away.
      </p>

      <PrimaryButton onClick={onConnect} loading={loading}>
        Connect Google Business &rarr;
      </PrimaryButton>

      <p className="mt-4 text-xs text-void-200 text-center font-body">
        We only request permission to read reviews and post replies. Nothing
        else.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Step 2 — Business Detected
   ═══════════════════════════════════════════════════════════════════════ */

function Step2({
  locations,
  selectedId,
  onSelect,
  onContinue,
  onDisconnect,
  loading,
}: {
  locations: LocationData[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onContinue: () => void;
  onDisconnect: () => void;
  loading: boolean;
}) {
  return (
    <div className="animate-fade-up text-center">
      <CheckCircleIcon size={48} className="text-green-400 mx-auto mb-4" />
      <h1 className="font-display text-3xl font-bold text-white">
        Connected!
      </h1>

      {locations.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3">
          <div className="h-5 w-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
          <p className="text-void-100 font-body">Loading your business...</p>
        </div>
      ) : locations.length === 1 ? (
        <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-lg font-bold text-violet-400 font-display">
              {locations[0].display_name.charAt(0).toUpperCase()}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white font-body">
                {locations[0].display_name}
              </p>
              <p className="text-sm text-void-100 font-body">
                &#11088;{" "}
                {locations[0].average_rating?.toFixed(1) ?? "--"} &middot;{" "}
                {locations[0].total_reviews ?? "--"} reviews
              </p>
              <span className="mt-1 inline-block text-xs bg-void-800 px-2 py-0.5 rounded text-void-200 font-body">
                Google Business Profile
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-2">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => onSelect(loc.id)}
              className={[
                "w-full bg-white/5 backdrop-blur-lg border rounded-xl p-4 text-left transition-all cursor-pointer",
                selectedId === loc.id
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 hover:border-white/20",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                    selectedId === loc.id
                      ? "border-violet-500 bg-violet-500"
                      : "border-void-400",
                  ].join(" ")}
                >
                  {selectedId === loc.id && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white font-body">
                    {loc.display_name}
                  </p>
                  <p className="text-sm text-void-100 font-body">
                    &#11088; {loc.average_rating?.toFixed(1) ?? "--"} &middot;{" "}
                    {loc.total_reviews ?? "--"} reviews
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      <PrimaryButton
        onClick={onContinue}
        disabled={!selectedId}
        loading={loading}
      >
        Looks good, continue &rarr;
      </PrimaryButton>

      <button
        onClick={onDisconnect}
        className="mt-3 text-xs text-violet-400 hover:text-violet-300 cursor-pointer mx-auto block font-body"
      >
        Wrong account? Disconnect and try again
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Step 3 — Set Brand Voice
   ═══════════════════════════════════════════════════════════════════════ */

function Step3({
  selectedTone,
  onSelectTone,
  customInstructions,
  onChangeInstructions,
  onSave,
  loading,
}: {
  selectedTone: OnboardingTone;
  onSelectTone: (tone: OnboardingTone) => void;
  customInstructions: string;
  onChangeInstructions: (val: string) => void;
  onSave: () => void;
  loading: boolean;
}) {
  return (
    <div className="animate-fade-up">
      <h1 className="font-display text-3xl font-bold text-white text-center">
        How do you want to sound?
      </h1>
      <p className="mt-3 text-void-100 text-center font-body">
        Stareply will match this tone in every reply. You can change it anytime.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {TONES.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onSelectTone(tone.id)}
            className={[
              "relative flex flex-col items-center gap-3 rounded-xl p-5 text-center transition-all cursor-pointer",
              selectedTone === tone.id
                ? "bg-violet-500/10 border-2 border-violet-500"
                : "bg-void-900 border border-white/[0.08] hover:border-white/[0.15]",
            ].join(" ")}
          >
            {selectedTone === tone.id && (
              <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 text-white text-xs">
                &#10003;
              </span>
            )}
            <span className="text-3xl">{tone.emoji}</span>
            <span className="font-semibold text-white text-sm font-body">
              {tone.label}
            </span>
            <p className="text-xs text-void-200 leading-relaxed font-body">
              &ldquo;{tone.example}&rdquo;
            </p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <label className="block text-sm text-void-100 mb-2 font-body">
          Anything else we should know?
        </label>
        <div className="relative">
          <textarea
            value={customInstructions}
            onChange={(e) => {
              if (e.target.value.length <= 200)
                onChangeInstructions(e.target.value);
            }}
            placeholder="E.g. Always mention our loyalty program. Never promise refunds. Keep it under 80 words."
            rows={3}
            className="w-full rounded-[var(--radius-md)] bg-void-900 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-void-400 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/30 font-body resize-none"
          />
          <span className="absolute bottom-2 right-3 text-xs text-void-400 font-body">
            {customInstructions.length}/200
          </span>
        </div>
      </div>

      <PrimaryButton onClick={onSave} loading={loading}>
        Save and continue &rarr;
      </PrimaryButton>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Step 4 — Done
   ═══════════════════════════════════════════════════════════════════════ */

function Step4({
  onComplete,
  loading,
}: {
  onComplete: () => void;
  loading: boolean;
}) {
  useEffect(() => {
    import("canvas-confetti").then((mod) => {
      const confetti = mod.default;
      const end = Date.now() + 3000;
      const colors = ["#7C3AED", "#06B6D4", "#FFFFFF", "#F5C842"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    });
  }, []);

  return (
    <div className="animate-fade-up text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 animate-scale-in">
        <CheckCircleIcon size={48} className="text-green-400" />
      </div>

      <h1 className="font-display text-4xl font-bold text-white">
        You&apos;re all set.
      </h1>
      <p className="mt-3 text-void-100 font-body">
        Your AI is ready to reply. Here&apos;s what happens next:
      </p>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:gap-8 justify-center">
        {[
          {
            icon: "\uD83D\uDD14",
            title: "New review arrives",
            sub: "We notify you instantly",
          },
          {
            icon: "\u26A1",
            title: "AI drafts a reply",
            sub: "In under 3 seconds",
          },
          {
            icon: "\u2705",
            title: "You approve",
            sub: "Published to Google",
          },
        ].map((s) => (
          <div key={s.title} className="flex flex-col items-center gap-1.5">
            <span className="text-2xl">{s.icon}</span>
            <span className="text-sm font-semibold text-white font-body">
              {s.title}
            </span>
            <span className="text-xs text-void-200 font-body">{s.sub}</span>
          </div>
        ))}
      </div>

      <PrimaryButton onClick={onComplete} loading={loading}>
        Go to my dashboard &rarr;
      </PrimaryButton>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Main Wizard (state management)
   ═══════════════════════════════════════════════════════════════════════ */

function OnboardingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [currentStep, setCurrentStep] = useState(1);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(
    null
  );
  const [selectedTone, setSelectedTone] = useState<OnboardingTone>("friendly");
  const [customInstructions, setCustomInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  // Initialize step from URL param or localStorage
  useEffect(() => {
    const urlStep = searchParams.get("step");
    if (urlStep) {
      const step = parseInt(urlStep);
      if (step >= 1 && step <= 4) {
        setCurrentStep(step);
        localStorage.setItem("stareply_onboarding_step", String(step));
      }
    } else {
      const saved = localStorage.getItem("stareply_onboarding_step");
      if (saved) {
        const step = parseInt(saved);
        if (step >= 1 && step <= 4) setCurrentStep(step);
      }
    }
  }, [searchParams]);

  // Persist step changes to localStorage
  useEffect(() => {
    localStorage.setItem("stareply_onboarding_step", String(currentStep));
  }, [currentStep]);

  // Fetch locations when entering step 2
  useEffect(() => {
    if (currentStep === 2) {
      fetchLocations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  async function fetchLocations() {
    const { data } = await supabase
      .from("locations")
      .select("id, display_name, average_rating, total_reviews");

    if (data && data.length > 0) {
      setLocations(data as LocationData[]);
      setSelectedLocationId(data[0].id);
    }
  }

  // Step 1 — Initiate Google OAuth via Supabase
  async function handleConnectGoogle() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/business.manage",
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?onboarding=true`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  }

  // Step 2 — Save location & trigger background review sync
  async function handleSaveLocation() {
    if (!selectedLocationId) return;
    setLoading(true);

    // Fire-and-forget review sync
    fetch("/api/reviews/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ location_id: selectedLocationId }),
    }).catch(() => {});

    setLoading(false);
    setCurrentStep(3);
  }

  // Step 3 — Save brand voice settings
  async function handleSaveBrandVoice() {
    if (!selectedLocationId) return;
    setLoading(true);

    await supabase
      .from("locations")
      .update({
        tone: selectedTone,
        custom_instructions: customInstructions,
      })
      .eq("id", selectedLocationId);

    setLoading(false);
    setCurrentStep(4);
  }

  // Step 4 — Mark onboarding complete, go to dashboard
  async function handleComplete() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("profiles")
        .update({ onboarding_completed: true })
        .eq("id", user.id);
    }

    localStorage.removeItem("stareply_onboarding_step");
    router.push("/app");
  }

  // Disconnect — remove locations and restart
  async function handleDisconnect() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("locations").delete().eq("user_id", user.id);
    }
    setLocations([]);
    setSelectedLocationId(null);
    setCurrentStep(1);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ProgressDots current={currentStep} />

      <div className="flex-1 flex items-center justify-center px-6 pb-12">
        <div className="max-w-lg w-full">
          {currentStep === 1 && (
            <Step1 onConnect={handleConnectGoogle} loading={loading} />
          )}

          {currentStep === 2 && (
            <Step2
              locations={locations}
              selectedId={selectedLocationId}
              onSelect={setSelectedLocationId}
              onContinue={handleSaveLocation}
              onDisconnect={handleDisconnect}
              loading={loading}
            />
          )}

          {currentStep === 3 && (
            <Step3
              selectedTone={selectedTone}
              onSelectTone={setSelectedTone}
              customInstructions={customInstructions}
              onChangeInstructions={setCustomInstructions}
              onSave={handleSaveBrandVoice}
              loading={loading}
            />
          )}

          {currentStep === 4 && (
            <Step4 onComplete={handleComplete} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   Page export — Suspense boundary for useSearchParams
   ═══════════════════════════════════════════════════════════════════════ */

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingWizard />
    </Suspense>
  );
}
