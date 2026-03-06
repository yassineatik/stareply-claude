interface GoogleTokens {
  access_token: string;
  refresh_token: string;
}

interface GoogleAccount {
  name: string;
  accountName: string;
  type: string;
}

interface GoogleReview {
  name: string;
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
}

interface GoogleReviewsResponse {
  reviews: GoogleReview[];
  averageRating: number;
  totalReviewCount: number;
  nextPageToken?: string;
}

const RATING_MAP: Record<string, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const GOOGLE_API_BASE = "https://mybusiness.googleapis.com/v4";

async function refreshAccessToken(refreshToken: string): Promise<string> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to refresh Google token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token as string;
}

export async function getAccounts(tokens: GoogleTokens): Promise<GoogleAccount[]> {
  const response = await fetch(`${GOOGLE_API_BASE}/accounts`, {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken(tokens.refresh_token);
    const retryResponse = await fetch(`${GOOGLE_API_BASE}/accounts`, {
      headers: { Authorization: `Bearer ${newToken}` },
    });
    const data = await retryResponse.json();
    return data.accounts ?? [];
  }

  if (!response.ok) {
    throw new Error(`Google API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.accounts ?? [];
}

export async function getReviews(
  locationName: string,
  accessToken: string,
  pageToken?: string
): Promise<GoogleReviewsResponse> {
  const url = new URL(`${GOOGLE_API_BASE}/${locationName}/reviews`);
  if (pageToken) url.searchParams.set("pageToken", pageToken);
  url.searchParams.set("pageSize", "50");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }

  return response.json();
}

export async function postReply(
  locationName: string,
  reviewName: string,
  content: string,
  accessToken: string
): Promise<void> {
  const response = await fetch(
    `${GOOGLE_API_BASE}/${reviewName}/reply`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: content }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to publish reply: ${response.statusText}`);
  }
}

export function parseRating(starRating: string): number {
  return RATING_MAP[starRating] ?? 0;
}

export type { GoogleTokens, GoogleAccount, GoogleReview, GoogleReviewsResponse };
