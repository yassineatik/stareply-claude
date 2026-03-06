import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect dashboard and onboarding routes — redirect to login if unauthenticated
  if (!user && (pathname.startsWith("/app") || pathname.startsWith("/onboarding"))) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // For authenticated users, enforce onboarding flow
  if (user) {
    const isAuthPage = pathname === "/login" || pathname === "/signup";
    const isDashboard = pathname.startsWith("/app");
    const isOnboarding = pathname.startsWith("/onboarding");

    if (isAuthPage || isDashboard) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      const onboardingComplete = profile?.onboarding_completed ?? false;

      if (isAuthPage) {
        const url = request.nextUrl.clone();
        url.pathname = onboardingComplete ? "/app" : "/onboarding";
        return NextResponse.redirect(url);
      }

      if (isDashboard && !onboardingComplete) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
      }
    }

    // If user completed onboarding but visits /onboarding, send to dashboard
    if (isOnboarding) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      if (profile?.onboarding_completed) {
        const url = request.nextUrl.clone();
        url.pathname = "/app";
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
