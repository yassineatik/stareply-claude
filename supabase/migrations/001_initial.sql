-- Stareply Initial Schema
-- Tables: profiles, locations, reviews, replies
-- All with RLS enabled + policies + performance indexes

-- ===========================================
-- EXTENSIONS
-- ===========================================

create extension if not exists "uuid-ossp";

-- ===========================================
-- PROFILES
-- ===========================================

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  plan        text not null default 'free' check (plan in ('free', 'starter', 'growth', 'agency')),
  stripe_customer_id text unique,
  replies_used   integer not null default 0,
  replies_limit  integer not null default 10,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read and update their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Auto-create profile on signup (via trigger)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ===========================================
-- LOCATIONS
-- ===========================================

create table public.locations (
  id                   uuid primary key default uuid_generate_v4(),
  user_id              uuid not null references public.profiles(id) on delete cascade,
  google_account_id    text not null,
  location_name        text not null,
  display_name         text not null,
  google_access_token  text,
  google_refresh_token text,
  tone                 text not null default 'friendly' check (tone in ('friendly', 'professional', 'personal', 'custom')),
  industry             text,
  brand_keywords       text[] not null default '{}',
  avoid_keywords       text[] not null default '{}',
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

alter table public.locations enable row level security;

create policy "Users can view own locations"
  on public.locations for select
  using (auth.uid() = user_id);

create policy "Users can insert own locations"
  on public.locations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own locations"
  on public.locations for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own locations"
  on public.locations for delete
  using (auth.uid() = user_id);

create index idx_locations_user_id on public.locations(user_id);

-- ===========================================
-- REVIEWS
-- ===========================================

create table public.reviews (
  id                 uuid primary key default uuid_generate_v4(),
  location_id        uuid not null references public.locations(id) on delete cascade,
  google_review_id   text not null unique,
  reviewer_name      text not null,
  rating             integer not null check (rating >= 1 and rating <= 5),
  comment            text,
  is_replied         boolean not null default false,
  review_created_at  timestamptz not null,
  created_at         timestamptz not null default now()
);

alter table public.reviews enable row level security;

-- Users can view reviews for their own locations
create policy "Users can view own reviews"
  on public.reviews for select
  using (
    exists (
      select 1 from public.locations
      where locations.id = reviews.location_id
        and locations.user_id = auth.uid()
    )
  );

create policy "Users can update own reviews"
  on public.reviews for update
  using (
    exists (
      select 1 from public.locations
      where locations.id = reviews.location_id
        and locations.user_id = auth.uid()
    )
  );

create index idx_reviews_location_id on public.reviews(location_id);
create index idx_reviews_is_replied on public.reviews(is_replied);
create index idx_reviews_rating on public.reviews(rating);
create index idx_reviews_location_unreplied on public.reviews(location_id, is_replied) where not is_replied;

-- ===========================================
-- REPLIES
-- ===========================================

create table public.replies (
  id             uuid primary key default uuid_generate_v4(),
  review_id      uuid not null references public.reviews(id) on delete cascade,
  location_id    uuid not null references public.locations(id) on delete cascade,
  content        text not null,
  tone           text not null check (tone in ('friendly', 'professional', 'personal', 'custom')),
  is_published   boolean not null default false,
  published_at   timestamptz,
  created_at     timestamptz not null default now()
);

alter table public.replies enable row level security;

-- Users can view replies for their own locations
create policy "Users can view own replies"
  on public.replies for select
  using (
    exists (
      select 1 from public.locations
      where locations.id = replies.location_id
        and locations.user_id = auth.uid()
    )
  );

create policy "Users can insert own replies"
  on public.replies for insert
  with check (
    exists (
      select 1 from public.locations
      where locations.id = replies.location_id
        and locations.user_id = auth.uid()
    )
  );

create policy "Users can update own replies"
  on public.replies for update
  using (
    exists (
      select 1 from public.locations
      where locations.id = replies.location_id
        and locations.user_id = auth.uid()
    )
  );

create index idx_replies_review_id on public.replies(review_id);
create index idx_replies_location_id on public.replies(location_id);

-- ===========================================
-- UPDATED_AT TRIGGER (shared)
-- ===========================================

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();

create trigger set_locations_updated_at
  before update on public.locations
  for each row execute function public.update_updated_at();
