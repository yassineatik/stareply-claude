/* === Database Types (mirrors Supabase schema) === */

export type Plan = "free" | "starter" | "growth" | "agency";

export type Tone = "friendly" | "professional" | "personal" | "custom" | "casual";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: Plan;
  stripe_customer_id: string | null;
  replies_used: number;
  replies_limit: number;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  user_id: string;
  google_account_id: string;
  location_name: string;
  display_name: string;
  google_access_token: string | null;
  google_refresh_token: string | null;
  tone: Tone;
  industry: string | null;
  brand_keywords: string[];
  avoid_keywords: string[];
  custom_instructions: string | null;
  average_rating: number | null;
  total_reviews: number | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  location_id: string;
  google_review_id: string;
  reviewer_name: string;
  rating: number;
  comment: string | null;
  is_replied: boolean;
  review_created_at: string;
  created_at: string;
}

export interface Reply {
  id: string;
  review_id: string;
  location_id: string;
  content: string;
  tone: Tone;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
}

/* === API Types === */

export interface GenerateReplyRequest {
  review_id: string;
  tone: Tone;
}

export interface GenerateReplyResponse {
  reply: string;
  tone: Tone;
}

export interface PublishReplyRequest {
  reply_id: string;
}

/* === UI Types === */

export type ReviewFilter = "all" | "unreplied" | "1" | "2" | "3" | "4" | "5";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type BadgeVariant = "default" | "success" | "warning" | "error" | "purple";

export type CardVariant = "standard" | "glow";
