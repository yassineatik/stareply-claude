-- Add onboarding tracking to profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false;

-- Add custom instructions and stats to locations
ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS custom_instructions text DEFAULT '';

ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS average_rating numeric;

ALTER TABLE public.locations
  ADD COLUMN IF NOT EXISTS total_reviews integer;

-- Expand allowed tones to include 'casual'
ALTER TABLE public.locations DROP CONSTRAINT IF EXISTS locations_tone_check;
ALTER TABLE public.locations
  ADD CONSTRAINT locations_tone_check
  CHECK (tone IN ('friendly', 'professional', 'personal', 'custom', 'casual'));

-- Allow users to insert reviews for their own locations (needed for review sync)
CREATE POLICY "Users can insert reviews for own locations"
  ON public.reviews FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.locations
      WHERE locations.id = reviews.location_id
        AND locations.user_id = auth.uid()
    )
  );
