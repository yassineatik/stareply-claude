import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", request.url));
  }

  // Exchange authorization code for tokens
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

  // Fetch the user's GBP accounts
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

  // Save tokens and location data
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Insert locations for each account
  for (const account of accounts) {
    // Fetch locations for this account
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
