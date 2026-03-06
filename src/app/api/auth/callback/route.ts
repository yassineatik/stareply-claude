import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const isOnboarding = searchParams.get("onboarding") === "true";

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", request.url));
  }

  // ── Onboarding flow: Supabase OAuth with Google ──────────────────────
  if (isOnboarding) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.session) {
      return NextResponse.redirect(
        new URL("/onboarding?error=oauth_failed", request.url)
      );
    }

    const googleAccessToken = data.session.provider_token;
    const googleRefreshToken = data.session.provider_refresh_token;
    const user = data.session.user;

    if (!googleAccessToken) {
      return NextResponse.redirect(
        new URL("/onboarding?error=no_token", request.url)
      );
    }

    // Fetch GBP accounts
    const accountsResponse = await fetch(
      "https://mybusiness.googleapis.com/v4/accounts",
      { headers: { Authorization: `Bearer ${googleAccessToken}` } }
    );

    if (accountsResponse.ok) {
      const accountsData = await accountsResponse.json();
      const accounts = accountsData.accounts ?? [];

      for (const account of accounts) {
        const locationsResponse = await fetch(
          `https://mybusiness.googleapis.com/v4/${account.name}/locations`,
          { headers: { Authorization: `Bearer ${googleAccessToken}` } }
        );

        if (!locationsResponse.ok) continue;

        const locationsData = await locationsResponse.json();
        const locations = locationsData.locations ?? [];

        for (const location of locations) {
          await supabase.from("locations").upsert(
            {
              user_id: user.id,
              google_account_id: account.name,
              location_name: location.name,
              display_name: location.locationName ?? location.name,
              google_access_token: googleAccessToken,
              google_refresh_token: googleRefreshToken ?? null,
            },
            { onConflict: "user_id,location_name" }
          );
        }
      }
    }

    return NextResponse.redirect(
      new URL("/onboarding?step=2", request.url)
    );
  }

  // ── Existing flow: direct Google OAuth code exchange ─────────────────
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.redirect(
      new URL("/app/settings/locations?error=oauth_failed", request.url)
    );
  }

  const tokens = await tokenResponse.json();
  const accessToken = tokens.access_token as string;
  const refreshToken = tokens.refresh_token as string;

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Fetch and save locations
  const accountsResponse = await fetch(
    "https://mybusiness.googleapis.com/v4/accounts",
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  if (!accountsResponse.ok) {
    return NextResponse.redirect(
      new URL("/app/settings/locations?error=accounts_failed", request.url)
    );
  }

  const accountsData = await accountsResponse.json();
  const accounts = accountsData.accounts ?? [];

  for (const account of accounts) {
    const locationsResponse = await fetch(
      `https://mybusiness.googleapis.com/v4/${account.name}/locations`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!locationsResponse.ok) continue;

    const locationsData = await locationsResponse.json();
    const locations = locationsData.locations ?? [];

    for (const location of locations) {
      await supabase.from("locations").upsert(
        {
          user_id: user.id,
          google_account_id: account.name,
          location_name: location.name,
          display_name: location.locationName ?? location.name,
          google_access_token: accessToken,
          google_refresh_token: refreshToken,
        },
        { onConflict: "user_id,location_name" }
      );
    }
  }

  return NextResponse.redirect(
    new URL("/app/settings/locations?success=true", request.url)
  );
}
