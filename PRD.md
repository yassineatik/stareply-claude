# ⭐ Stareply — Product Requirements Document

> AI-Powered Review Response Platform for Local Businesses
> **Version:** 1.0 · **Date:** March 2026 · **Status:** Active

---

## Table of Contents

1. [The Problem](#1-the-problem)
2. [The Solution](#2-the-solution)
3. [Market Opportunity](#3-market-opportunity)
4. [Competitive Landscape](#4-competitive-landscape)
5. [User Personas](#5-user-personas)
6. [Product Features & MVP Scope](#6-product-features--mvp-scope)
7. [Pricing Strategy](#7-pricing-strategy)
8. [Technical Architecture](#8-technical-architecture)
9. [Go-To-Market & SEO Strategy](#9-go-to-market--seo-strategy)
10. [Development Roadmap](#10-development-roadmap)
11. [Revenue Projections](#11-revenue-projections)
12. [Success Metrics & KPIs](#12-success-metrics--kpis)

---

## 1. The Problem

Every unanswered review is lost revenue.

Online reviews directly impact purchasing decisions — yet most local business owners never respond to them. Not because they don't care, but because responding well takes **time, skill, and consistency** they simply don't have.

| Pain Point | Reality |
|---|---|
| ⏱ **Time Drain** | Writing a thoughtful reply takes 10–15 min. Multiply by 50 reviews/month = hours lost |
| 😡 **Awkward Responses** | "Thank you for your feedback" is the industry default — it reads as robotic and uncaring |
| 😰 **Negative Reviews Ignored** | 1-star reviews without a response scare away 80%+ of potential customers who read them |

---

## 2. The Solution

**Stareply** is an AI-powered review response platform that connects to your Google Business Profile and automatically generates **personalized, on-brand replies** for every review — in seconds, not hours.

### How It Works

```
1. Connect Google Business Profile
        ↓
2. AI generates a personalized reply (using Claude)
        ↓
3. You review, edit if needed, and publish in 1 click
```

Think of it as a smart assistant that knows your business, matches your tone, and always knows the right thing to say.

---

## 3. Market Opportunity

### Market Size

| Year | Market Size |
|------|-------------|
| 2023 | $2.8B |
| 2024 | $3.5B |
| **2025** | **$4.2B** ← We launch here |
| 2026 | $4.9B |
| 2027 | $5.6B |

> Source: Online Reputation Management market projections

### Key Stats

- **87%** of consumers read online reviews before visiting a local business
- **45%** of customers say they'd visit a business more if it responds to reviews
- **33M+** SMBs in the US alone — our target addressable market

### Target Segments

| Segment | Examples | Avg Reviews/Month | Willingness to Pay |
|---------|----------|-------------------|--------------------|
| 🍽 Restaurants & Cafes | Single-owner bistros, chains | 40–100 | $$ |
| 🏥 Health & Wellness | Dentists, physios, clinics | 20–60 | $$$ |
| 🏨 Hotels & Hospitality | Boutique hotels, B&Bs | 30–80 | $$$ |
| 🔧 Home Services | Plumbers, cleaners, electricians | 15–40 | $$ |
| 🏢 Local SEO Agencies | Managing 10+ client locations | 200+ | $$$$ |

---

## 4. Competitive Landscape

### Pricing Overview

| Tool | Price/Month | Target | AI Quality | UX | SMB Friendly | Our Edge |
|------|-------------|--------|------------|----|--------------|----------|
| Birdeye | $349+ | Enterprise | ★★★★☆ | ★★★★☆ | ✗ Too expensive | 10x cheaper |
| Podium | $399+ | Enterprise | ★★★☆☆ | ★★★★★ | ✗ Too expensive | 10x cheaper |
| Widewail | $200+ | Mid-Market | ★★★☆☆ | ★★★☆☆ | ~ Borderline | Price + AI |
| Reviewly | $99+ | SMB | ★★★☆☆ | ★★★☆☆ | ~ Basic | Better AI + UX |
| RightResponse | $10 | SMB | ★★★★☆ | ★★☆☆☆ | ~ Too cheap/rough | Premium feel |
| **Stareply ✓** | **$29–149** | **SMB/Agency** | **★★★★★** | **★★★★★** | **✓ Built for it** | — |

### Competitive Positioning

The market splits cleanly:
- **Too expensive** → Birdeye ($349), Podium ($399) — enterprise suites
- **Too cheap/rough** → RightResponse ($10) — bare-bones, no brand
- **🎯 Sweet spot (ours)** → $29–$149 — polished, focused, affordable

> The $29–$59/month SMB slot is essentially unclaimed by anything well-designed. No one has built a clean, fast, beautifully designed "just reply to your reviews with AI" tool aimed squarely at the solo business owner.

---

## 5. User Personas

### 🍽 Khalid R. — Restaurant Owner
- **Location:** Casablanca · **Plan:** Starter ($29/mo)
- **Problem:** Gets 60+ Google reviews/month. Has no time to reply. Negative reviews from one bad day haunt his rating.
- **Goal:** Reply to every review without spending hours on it.

---

### 📊 Sara L. — Local SEO Agency Owner
- **Location:** London · **Plan:** Agency ($149/mo)
- **Problem:** Manages 12 client locations. Currently copy-pastes reply templates. Needs scale + white-label.
- **Goal:** Offer review management as a service to all clients from one dashboard.

---

### 🏥 Priya M. — Clinic Manager
- **Location:** Toronto · **Plan:** Growth ($59/mo)
- **Problem:** Needs HIPAA-aware, empathetic responses. Can't mention diagnoses. Tone must be warm and professional.
- **Goal:** Maintain a professional reputation while staying compliant.

---

### 🏠 Marcus J. — SaaS Founder
- **Location:** Austin · **Plan:** Starter ($29/mo)
- **Problem:** Bootstrapped B2B SaaS. Uses Google reviews as social proof. Wants consistent, professional replies.
- **Goal:** Look credible and responsive without dedicating time to it.

---

### 🏨 Yusuf A. — Airbnb Superhost
- **Location:** Dubai · **Plan:** Starter ($29/mo)
- **Problem:** Gets reviewed after every stay. Wants fast, personalized replies that maintain a 4.9★ rating.
- **Goal:** Reply within 24 hours to every guest review, effortlessly.

---

## 6. Product Features & MVP Scope

### Phase 1 — MVP (Weeks 1–3)

- ✅ Google Business Profile OAuth connection
- ✅ AI reply generation (powered by Claude API)
- ✅ Tone & brand customization (casual / professional / friendly)
- ✅ 1-click publish reply to Google
- ✅ Dashboard with reply history
- ✅ Email + Slack notifications for new reviews
- ✅ Stripe subscription billing

### Phase 2 — Expand (Weeks 3–5)

- 🔷 Multi-location management
- 🔷 Agency white-label (custom branding)
- 🔷 Yelp + TripAdvisor support
- 🔷 Sentiment analysis reports
- 🔷 Competitor review tracking
- 🔷 Auto-reply mode (optional, AI publishes automatically)
- 🔷 Team collaboration (multiple users per account)

### Phase 3 — Grow (Weeks 5–8)

- 🚀 API access for developers
- 🚀 Zapier / Make integration
- 🚀 Advanced analytics dashboard
- 🚀 Custom AI fine-tuning per business
- 🚀 Bulk reply tools
- 🚀 CSV export
- 🚀 Priority support SLA

### Out of Scope (v1)

- Facebook / App Store reviews (Phase 3+)
- CRM integrations (Phase 3+)
- Review generation / SMS request campaigns (not our focus)

---

## 7. Pricing Strategy

### Plans

| | Free | Starter | Growth | Agency |
|---|------|---------|--------|--------|
| **Price** | $0 | **$29/mo** | $59/mo | $149/mo |
| Locations | 1 | 1 | 3 | Unlimited |
| Replies/month | 10 | 100 | 500 | Unlimited |
| Google Business | ✓ | ✓ | ✓ | ✓ |
| AI Tone Customization | ✗ | ✓ | ✓ | ✓ |
| Multi-location | ✗ | ✗ | ✓ | ✓ |
| White-label | ✗ | ✗ | ✗ | ✓ |
| Priority Support | ✗ | ✗ | ✓ | ✓ |
| **Best For** | Try it | Solo owners | Growing SMB | Agencies |

> ⭐ **Most Popular:** Starter plan — perfectly sized for a single business owner who wants to look professional without overpaying.

### Pricing Rationale

- **Free tier** reduces friction for trial, feeds word-of-mouth
- **Starter at $29** is the impulse-buy zone — no budget approval needed
- **Growth at $59** unlocks multi-location for businesses that expand
- **Agency at $149** is the high-LTV tier — one agency = 10–30 sub-accounts

---

## 8. Technical Architecture

### Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js 14 (App Router) | Fast, SEO-friendly, familiar |
| Database | Supabase (Postgres + Auth) | Row-level security, real-time, free tier |
| AI Engine | Anthropic Claude API | Best-in-class response quality |
| Payments | Stripe | Subscriptions + usage billing |
| Background Jobs | Inngest | Reliable async reply generation |
| Email | Resend | Transactional, simple API |
| Hosting | Vercel | Zero-config deploys, edge network |
| Review API | Google My Business API | Official, approved integration |

### Data Flow

```
User connects GBP (OAuth)
        ↓
Webhook fires on new review
        ↓
Inngest job queued
        ↓
Claude API called with business context + review text
        ↓
Reply stored in Supabase
        ↓
User notified (email/Slack)
        ↓
User approves → POST to Google My Business API
```

### Key Technical Decisions

- **Row-Level Security** in Supabase ensures multi-tenant data isolation
- **Claude prompt** includes business name, industry, tone preference, and full review text
- **Webhook-based** (not polling) to minimize API usage costs
- **Rate limiting** on reply generation to prevent abuse on free tier

---

## 9. Go-To-Market & SEO Strategy

### GTM Channels

| Channel | Tactic | Target | Timeline |
|---------|--------|--------|----------|
| SEO Content | Blog posts targeting "AI Google review response" keywords | 500 organic visitors/mo | Month 1–3 |
| Reddit | Genuine value posts in r/GoogleMyBusiness, r/smallbusiness | 50 trial signups | Month 1 |
| Product Hunt | Launch day — target #2 Product of the Day | 200 signups | Month 2 |
| Cold Outreach | DM restaurant owners + local agencies on LinkedIn | 30 demos | Month 1–2 |
| Agency Resellers | White-label partnerships with local SEO agencies | 10+ client locations each | Month 3+ |
| Google Ads | Target: "respond to google reviews" — low CPC niche | CPA < $30 | Month 3+ |

### Top SEO Keywords

| Keyword | Monthly Volume | Difficulty | Priority |
|---------|----------------|------------|----------|
| AI reply to google reviews | 2,400 | Low | 🔥 High |
| respond to google reviews automatically | 1,800 | Low | 🔥 High |
| google review response tool | 3,200 | Medium | ✅ Medium |
| review response software for restaurants | 900 | Low | 🔥 High |
| how to respond to negative reviews | 8,100 | Medium | ✅ Medium |
| AI review response generator | 1,400 | Low | 🔥 High |

### Content Strategy

- **Pillar page:** "The Complete Guide to Responding to Google Reviews" (target 8,100/mo keyword)
- **Comparison pages:** "Stareply vs Birdeye", "Stareply vs RightResponse AI"
- **Industry pages:** Landing pages for restaurants, dentists, hotels, home services
- **Free tool:** Public-facing "Free AI Review Response Generator" as lead magnet

---

## 10. Development Roadmap

### Timeline Overview

```
Week 1–3: PHASE 1 — MVP
├── Google OAuth + GBP API integration
├── AI reply engine (Claude)
├── Next.js dashboard + Supabase auth
└── Stripe billing → First paying customer 💳

Week 3–5: PHASE 2 — Expand
├── Multi-location support
├── Agency white-label tier
└── → First agency deal 🏢

Week 5–8: PHASE 3 — Grow
├── Yelp + TripAdvisor support
├── Auto-reply mode
├── Analytics dashboard v2
└── → 100 customers 📊

Week 8–10: PHASE 4 — Scale
├── API access
├── Zapier integration
├── Enterprise contracts
└── → $5K MRR 🚀
```

### Milestones

| Milestone | Target Date | Success Criteria |
|-----------|-------------|-----------------|
| MVP Live | Week 3 | First paying customer |
| First Agency Deal | Week 5 | 1 agency with 3+ locations |
| Product Hunt Launch | Week 6 | Top 5 of the day |
| 100 Customers | Week 10 | Across all plans |
| $1K MRR | Month 3 | ~35 paying customers |
| $5K MRR | Month 6 | ~130 paying customers |

---

## 11. Revenue Projections

### MRR Forecast

| Month | Customers | MRR | Key Driver |
|-------|-----------|-----|------------|
| 1 | 5 | $145 | Friends + beta |
| 2 | 15 | $435 | Reddit + PH launch |
| 3 | 35 | $1,015 | SEO starts kicking in |
| 4 | 60 | $1,980 | Agency tier sells |
| 5 | 95 | $3,120 | Word of mouth |
| 6 | 130 | $5,070 | SEO + outreach flywheel |
| 9 | 250 | $12,500 | Content compound growth |
| 12 | 500 | $25,000 | Full GTM firing |

### Revenue Assumptions

- **Average Revenue Per User (ARPU):** ~$29 initially → grows to ~$50 as upsells kick in
- **Monthly Churn:** Starts at ~8%, improves to 3% by Month 12 as product matures
- **Free → Paid Conversion:** 15% initially → 25% with improved onboarding
- **Agency Tier Impact:** Each agency deal = ~$149/mo but represents 10–30 "location equivalents"

### Conversion Funnel (Monthly Estimates at Scale)

```
1,000 website visitors
        ↓ 15%
150 free trial signups
        ↓ 53%
80 active users (used product 3+ times)
        ↓ 37%
30 paid conversions
```

---

## 12. Success Metrics & KPIs

### Growth KPIs

| Metric | Month 1 | Month 3 | Month 6 | Month 12 | Why It Matters |
|--------|---------|---------|---------|----------|----------------|
| Monthly Recurring Revenue | $0 | $1,000 | $5,000 | $25,000 | Core health indicator |
| Paying Customers | 5 | 35 | 130 | 500 | Growth rate signal |
| Free Trial → Paid Conv. | — | 15% | 20% | 25% | Product-market fit |
| Monthly Churn Rate | — | < 8% | < 5% | < 3% | Retention quality |
| Avg Revenue Per User | — | $29 | $38 | $50 | Upsell effectiveness |
| Replies Generated/mo | 100 | 2,500 | 15,000 | 80,000 | Usage depth |
| NPS Score | — | > 40 | > 50 | > 60 | Customer delight |
| Organic Search Traffic | 500 | 2,000 | 8,000 | 30,000 | SEO ROI |

### Product Quality KPIs

- **Reply generation time:** < 3 seconds per review
- **Reply acceptance rate:** > 85% (user publishes without editing)
- **Uptime:** > 99.5%
- **Google API error rate:** < 1%

### Early Warning Signals

- Churn > 10% for 2 consecutive months → review pricing/onboarding
- Reply acceptance rate < 70% → AI prompt needs tuning
- Free → Paid < 10% → free tier may be too generous or UX friction at paywall

---

## Appendix

### Domain
- **Primary:** stareply.io ✅ (available)
- **Also available:** stareply.co, stareply.ai, stareply.app

### Brand
- **Name:** Stareply
- **Tagline:** *Reply smarter. Rank higher.*
- **Colors:** Purple (#6C3FF5) + Dark (#1A1033) + Yellow accent (#F5C842)
- **Voice:** Professional but warm. Direct. No jargon.

### Stack Summary
```
Next.js 14 + TypeScript
Supabase (Postgres + Auth + Storage)
Anthropic Claude API (claude-sonnet-4-6)
Stripe (subscriptions + metered billing)
Inngest (background jobs)
Resend (email)
Vercel (hosting)
```

### Competitors to Monitor
- [RightResponse AI](https://rightresponseai.com) — $10/mo, direct competitor on features
- [Reviewly.ai](https://reviewly.ai) — $99/mo, review collection + AI replies
- [Birdeye](https://birdeye.com) — $349/mo, enterprise suite
- [Podium](https://podium.com) — $399/mo, enterprise suite

---

*Document maintained by: Yassine / Stareply*
*Last updated: March 2026*
