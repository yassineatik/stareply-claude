# 🎨 Stareply — Website Design System & Spec

> **For AI Builders:** This document is the single source of truth for how Stareply looks, feels, and works. Follow it precisely. Every section has a clear directive. When in doubt, refer back to the Design Principles.

---

## Table of Contents

1. [Design Direction & Theme](#1-design-direction--theme)
2. [Design Tokens](#2-design-tokens)
3. [Component Library](#3-component-library)
4. [Site Map](#4-site-map)
5. [Page Specs](#5-page-specs)
6. [Dashboard App UI](#6-dashboard-app-ui)
7. [Animations & Motion](#7-animations--motion)
8. [Responsive Behavior](#8-responsive-behavior)
9. [States — Loading, Empty, Error](#9-states)
10. [Copy & Tone Guidelines](#10-copy--tone)
11. [File Structure](#11-file-structure)

---

## 1. Design Direction & Theme

### Theme Name: **"Dark Luminary"**

A premium, dark-first SaaS interface that feels like a command center — not a marketing brochure. Think Linear.app meets Resend.com. Every pixel communicates: *this tool was built by people who care about craft.*

### Aesthetic Inspirations (Named)

| Reference | What we take from it |
|-----------|----------------------|
| **Linear.app** | Dark backgrounds, glowing purple accents, tight typography, precision feel |
| **Vercel dark** | Midnight bg, clean bento grids, monochrome base with one sharp accent |
| **Resend.com** | Brutally clean, bold headlines on dark, code-aesthetic credibility signals |
| **Raycast** | Glassmorphism cards, spotlight hover effects, elevated surface layers |
| **Clerk.com** | Side-by-side demo + copy, developer trust signals, clean auth UI |

### Core Feel (3 words)

> **Precise. Confident. Alive.**

### What This Is NOT

- Not a pastel SaaS (no soft gradients on white backgrounds)
- Not corporate blue ("we help businesses grow!")
- Not template-looking (no generic hero + 3 feature cards)
- Not overcrowded (breathing room is a feature, not an afterthought)

### Design Principles

1. **Dark by default** — `#0A0A0F` base. Near-black, not midnight blue.
2. **One accent, used ruthlessly** — Purple `#7C3AED` is the only color that pops. Everything else earns its place.
3. **Typography does the heavy lifting** — Headlines are BIG. Whitespace is generous. The copy IS the design.
4. **Bento grid for features** — Cards of varying sizes in a grid. No carousels.
5. **Alive, not flashy** — Subtle hover states, shimmer effects, micro-animations. Never autoplay anything loud.

---

## 2. Design Tokens

### Colors

```css
:root {
  /* Base */
  --bg-base:        #0A0A0F;   /* Page background */
  --bg-surface:     #111118;   /* Cards, panels */
  --bg-elevated:    #1C1C28;   /* Modals, dropdowns */
  --bg-overlay:     #2A2A3A;   /* Hover states */

  /* Borders */
  --border-subtle:  #1E1E2E;   /* Default card border */
  --border-default: #2D2D42;   /* Focused inputs */
  --border-strong:  #4C4C6A;   /* Active states */

  /* Brand */
  --accent:         #7C3AED;   /* Primary CTA, links, focus rings */
  --accent-bright:  #9D5FF0;   /* Hover on CTAs */
  --accent-dim:     #4C1D95;   /* Background tints */
  --accent-glow:    rgba(124, 58, 237, 0.15);

  /* Text */
  --text-primary:   #F8F8FC;
  --text-secondary: #9A9AB0;
  --text-muted:     #5C5C78;

  /* Semantic */
  --success:  #10B981;
  --warning:  #F59E0B;
  --error:    #EF4444;
  --star:     #F5C842;

  /* Gradients */
  --gradient-hero: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.3) 0%, transparent 60%);
  --gradient-card: linear-gradient(135deg, rgba(124,58,237,0.08) 0%, transparent 60%);
}
```

### Typography

```css
/* Import */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --font-display: 'Syne', sans-serif;      /* Headlines — geometric, strong character */
  --font-body:    'DM Sans', sans-serif;   /* Body — clean, readable, slightly informal */
  --font-mono:    'JetBrains Mono', mono;  /* Code, review text snippets */

  --text-xs:   0.75rem;    /* 12px — labels, badges */
  --text-sm:   0.875rem;   /* 14px — secondary copy */
  --text-base: 1rem;       /* 16px — body */
  --text-lg:   1.125rem;   /* 18px */
  --text-xl:   1.25rem;    /* 20px */
  --text-2xl:  1.5rem;     /* 24px */
  --text-3xl:  1.875rem;   /* 30px */
  --text-4xl:  2.25rem;    /* 36px */
  --text-5xl:  3rem;       /* 48px */
  --text-6xl:  3.75rem;    /* 60px */
  --text-7xl:  4.5rem;     /* 72px — hero */
}
```

### Spacing & Radius

```css
:root {
  --space-2:  0.5rem;    /* 8px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-24: 6rem;      /* 96px */

  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  --shadow-card:   0 0 0 1px var(--border-subtle), 0 4px 16px rgba(0,0,0,0.4);
  --shadow-accent: 0 0 30px rgba(124,58,237,0.3), 0 0 60px rgba(124,58,237,0.1);
  --glow-button:   0 0 20px rgba(124,58,237,0.4);
}
```

---

## 3. Component Library

### Button

```
PRIMARY
  bg: var(--accent), text: white, border-radius: var(--radius-md), padding: 12px 24px
  font: var(--font-body) 500 15px
  hover: bg → var(--accent-bright), box-shadow → var(--glow-button), translateY(-1px)
  active: translateY(0)

SECONDARY
  bg: transparent, text: var(--text-primary)
  border: 1px solid var(--border-default)
  hover: bg → var(--bg-overlay), border → var(--border-strong)

GHOST
  bg: transparent, text: var(--text-secondary), no border
  hover: text → var(--text-primary), bg → rgba(255,255,255,0.04)
```

### Card

```
STANDARD
  bg: var(--bg-surface), border: 1px solid var(--border-subtle)
  border-radius: var(--radius-lg), padding: 24px
  box-shadow: var(--shadow-card)
  hover: border → var(--border-default), translateY(-2px), transition: 200ms ease

GLOW (featured/highlighted)
  Same as standard PLUS:
  background: linear-gradient(135deg, rgba(124,58,237,0.08) 0%, var(--bg-surface) 50%)
  border: 1px solid rgba(124,58,237,0.3)
  hover: box-shadow → var(--shadow-accent)
```

### Input

```
bg: var(--bg-elevated), border: 1px solid var(--border-default)
border-radius: var(--radius-md), padding: 10px 14px
font: var(--font-body) 400 15px, color: var(--text-primary)
placeholder: var(--text-muted)
focus: border → var(--accent), box-shadow: 0 0 0 3px var(--accent-glow), outline: none
```

### Badge

```
DEFAULT:  bg #1C1C28, text #9A9AB0, border 1px solid #2D2D42
SUCCESS:  bg #052e16, text #10B981, border 1px solid #065f46
WARNING:  bg #431407, text #F59E0B, border 1px solid #78350f
ERROR:    bg #450a0a, text #EF4444, border 1px solid #7f1d1d
PURPLE:   bg #2e1065, text #a78bfa, border 1px solid #4c1d95

All: padding 3px 10px, border-radius var(--radius-full), font-size var(--text-xs), font-weight 500
```

### Review Card (Core Product Component)

```
Structure:
┌───────────────────────────────────────────┐
│ ★★★★★  "John D."                2 days ago│
│ ─────────────────────────────────────────  │
│ "Great experience! The staff was           │
│  incredibly helpful and professional..."   │
│                                            │
│ ┌──── AI Reply Draft ──────────────────┐  │
│ │ Thank you so much, John! We're       │  │
│ │ thrilled to hear your kind words...  │  │
│ └──────────────────────────────────────┘  │
│                                            │
│  [Edit]   [Publish to Google ↗]  [↺ Regen]│
└───────────────────────────────────────────┘

- Outer: STANDARD CARD
- Stars: var(--star) filled, var(--border-strong) empty
- Review text: font-mono for authenticity
- AI Reply box: bg var(--accent-dim), border 1px solid rgba(124,58,237,0.3), border-radius var(--radius-md)
- Edit → GHOST, Publish → PRIMARY, Regen → SECONDARY
- On Publish: card gets left border 3px solid var(--success), fades to "Replied" state
```

### Navigation Bar

```
HEIGHT: 64px
BG: rgba(10,10,15,0.8) + backdrop-filter: blur(12px)
BORDER-BOTTOM: 1px solid var(--border-subtle)
POSITION: sticky top-0, z-index 100

LEFT:   ⭐ STAREPLY — Syne 700, 18px
CENTER: Features · Pricing · Blog  (marketing only)
RIGHT:  [Sign In] GHOST + [Start Free] PRIMARY small
```

---

## 4. Site Map

```
stareply.io/
│
├── /                     Landing Page
├── /pricing              Pricing
├── /blog                 Blog Index
├── /blog/[slug]          Blog Post
│
├── /auth/
│   ├── /login
│   └── /signup
│
└── /app/                 Protected Dashboard
    ├── /app              Home — Reply Queue
    ├── /app/reviews      All Reviews
    ├── /app/replies      Reply History
    └── /app/settings/
        ├── brand         Brand Voice & Tone
        ├── locations     Manage Locations
        ├── billing       Subscription & Usage
        └── notifications Alerts & Slack
```

---

## 5. Page Specs

### 5.1 Landing Page (`/`)

#### Hero Section

```
LAYOUT: Full-width, centered, min-height: 90vh
BG: var(--bg-base) + var(--gradient-hero)

Eyebrow badge (PURPLE variant, shimmer animation):
  "✨ New — Auto-reply mode is live"

H1 (Syne 800, 7xl, centered):
  "Reply to every Google review.
   Automatically."

Subhead (DM Sans 400, xl, var(--text-secondary), max-width 560px, centered):
  "Stareply uses AI to write personalized, on-brand responses
   to your Google reviews — in seconds, not hours.
   Connect once. Never miss a review again."

CTA Row:
  [Start Free — No card needed →]   PRIMARY large (padding 14px 28px)
  [See how it works ↓]              GHOST

Social proof (below CTA):
  ★★★★★  "Trusted by 500+ businesses"  |  ⚡ Setup in 90 seconds

HERO VISUAL (right of text or below on mobile):
  Floating browser-mockup showing the dashboard:
  1. New review notification slides in
  2. "Generating reply..." typing animation
  3. Reply appears + "Published ✓" green state
  Card treatment: GLOW CARD + var(--shadow-accent)
  Subtle parallax on scroll (moves at 0.3x speed)
```

#### Social Proof Marquee

```
Full-width strip, bg: var(--bg-surface), border top/bottom: 1px solid var(--border-subtle)
Padding: 20px 0

Infinite marquee (CSS animation, 30s loop, pause on hover):
  🍕 Bella Roma   🏥 CityDent Clinic   🔧 FastFix Plumbing   🏨 The Crest Hotel   ...
Font: DM Sans 400, 14px, var(--text-muted)
```

#### How It Works

```
BG: var(--bg-base), padding: 96px 0
H2 (Syne 700, 4xl, centered): "Three steps. That's it."

3-column layout (stack on mobile):

  [🔗] Step 1 — Connect
  "One OAuth click. We pull all your reviews automatically."

  [⚡] Step 2 — Generate
  "Claude reads the review and your brand settings,
   then drafts a reply in your exact voice."

  [✓] Step 3 — Publish
  "Review the draft in seconds. Hit publish.
   Your response appears on Google instantly."

Icons in purple circles (bg var(--accent-dim))
Connector: dashed line between steps on desktop (--border-default)
Scroll animation: staggered fade+slide-up (50ms delay each)
```

#### Feature Bento Grid

```
BG: var(--bg-base), padding: 96px 0
H2 (Syne 700, 4xl, centered): "Everything you need. Nothing you don't."

CSS Grid layout:
┌────────────────────────┬──────────────┐
│  LARGE (2/3)           │  SMALL (1/3) │
│  AI Tone Selector      │  2s Speed    │
│  with live preview     │  stat card   │
├──────────────┬─────────┴──────────────┤
│  SMALL (1/3) │  LARGE (2/3)           │
│  4.9★ Rating │  Handles 1-star reviews│
│  stat card   │  split-view demo       │
└──────────────┴────────────────────────┘

CARD 1 (Large) — "AI That Speaks Your Language"
  Toggle: Casual / Professional / Friendly / Custom
  Live preview of reply changing as toggle switches
  Badge: "✨ Powered by Claude"

CARD 2 (Small) — Speed
  Big number: "2s"
  Sub: "Average reply generation"
  Tiny sparkline chart

CARD 3 (Small) — Rating
  Before/after: 4.2★ → 4.8★ sparkline
  "Businesses that reply rank higher on Google Maps"

CARD 4 (Large) — Negative Reviews
  Left: 1-star angry review
  Right: calm, professional AI reply
  Badge: 🔴 "1-star handled"
```

#### Testimonials

```
BG: var(--bg-surface), padding: 96px 0
H2 (Syne 700, 4xl, centered): "Real businesses. Real results."

3-column cards (STANDARD CARD):
Each card:
  ★★★★★
  "Before Stareply, I was ignoring half my reviews.
   Now I reply to all 80 of them in minutes each month."
  — Khalid R., Restaurant Owner · Casablanca
```

#### Final CTA Banner

```
Max-width 800px, centered, margin: 96px auto
BG: linear-gradient(135deg, var(--accent-dim), var(--bg-elevated))
Border: 1px solid rgba(124,58,237,0.3), border-radius: var(--radius-xl)
Padding: 64px

H2 (Syne 800, 4xl): "Start replying smarter today."
Sub: "Free plan. No credit card. Up in 90 seconds."
CTA: [Connect Google Business →] PRIMARY large
Under CTA: "🔒 Secure OAuth · No passwords stored · Cancel anytime"
```

---

### 5.2 Pricing Page (`/pricing`)

```
HERO:
  H1 (Syne 800, 5xl): "Pricing that grows with you"
  Monthly / Annual toggle (Annual shows -20% savings)

PLAN CARDS (4 columns, gap 16px):
  FREE | STARTER | GROWTH (POPULAR) | AGENCY
  Full pricing data: see PRD.md §7
  "Most Popular" badge on Growth: PURPLE variant + GLOW CARD treatment

FAQ ACCORDION (below plans, max-width 640px, centered):
  8 questions with expand/collapse animation:
  - Can I switch plans anytime?
  - What happens if I hit my reply limit?
  - Do you store my Google credentials?
  - Difference between manual and auto-reply?
  - Can I white-label for clients?
  - Is there a setup fee?
  - What payment methods do you accept?
  - How do I cancel?
```

---

### 5.3 Auth Pages

#### Sign Up (`/auth/signup`)

```
LAYOUT: Split-screen (40% brand / 60% form)

LEFT PANEL (bg: var(--bg-surface)):
  Logo top-left
  H2 (Syne 700, 3xl): "Your reviews. Handled."
  3 trust bullets:
    ✓ Setup in 90 seconds
    ✓ No credit card required
    ✓ Cancel anytime
  Testimonial card at bottom

RIGHT PANEL (form):
  H2: "Create your account"
  [Continue with Google] — PRIMARY full-width with Google icon
  ── or ──
  Email input
  Password input
  [Create Account] PRIMARY full-width
  "By creating an account, you agree to our Terms and Privacy Policy"
  "Already have an account? Sign in"
```

---

## 6. Dashboard App UI

### 6.1 Layout Shell

```
┌─────────────────────────────────────────────────────┐
│  SIDEBAR (240px fixed) │  MAIN CONTENT               │
│                        │                             │
│  ⭐ Stareply           │  [page header]              │
│  ─────────────────     │  [page content]             │
│  📊 Dashboard          │                             │
│  💬 Reviews            │                             │
│  📜 Reply History      │                             │
│  ─────────────────     │                             │
│  ⚙️  Settings          │                             │
│  🎨 Brand Voice        │                             │
│  📍 Locations          │                             │
│  💳 Billing            │                             │
│  ─────────────────     │                             │
│  Usage: ████░ 60/100   │                             │
│  Starter Plan          │                             │
│  [Upgrade ↑]           │                             │
└─────────────────────────────────────────────────────┘

SIDEBAR:
  bg: var(--bg-surface)
  border-right: 1px solid var(--border-subtle)
  width: 240px, fixed, padding: 20px 12px

NAV ITEMS:
  Active: bg var(--accent-dim), text white, left border 2px var(--accent)
  Hover: bg var(--bg-overlay)
  Font: DM Sans 500, 14px, icon 16px

USAGE METER (pinned to sidebar bottom):
  Progress bar fill: var(--accent)
  >80% fill: var(--warning)
  >95% fill: var(--error) + upgrade CTA glows red
```

### 6.2 Dashboard Home

```
PAGE HEADER:
  H1 (Syne 700): "Good morning, Khalid 👋"
  Sub (DM Sans, text-secondary): "You have 3 new reviews waiting for a reply."

STATS ROW (4 equal cards, STANDARD CARD):
  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
  │ 12       │ │ 4.8 ★    │ │ 98%      │ │ 3        │
  │ Reviews  │ │ Avg      │ │ Reply    │ │ Pending  │
  │ Total    │ │ Rating   │ │ Rate     │ │ Replies  │
  └──────────┘ └──────────┘ └──────────┘ └──────────┘
  Numbers: Syne 700, 2xl, var(--text-primary)
  Labels: DM Sans 400, sm, var(--text-secondary)

REVIEW QUEUE:
  H2: "Pending Replies (3)"
  Filter bar: [All] [5-star] [1-2 star] [Unanswered] | Sort: [Newest ↓]
  Stacked REVIEW CARD components

REPLIED SECTION (below queue):
  Collapsible: "Recently Published (8)"
  Last 5 replies, each with SUCCESS badge + "Published" timestamp
```

### 6.3 Brand Voice Settings

```
ROUTE: /app/settings/brand
LAYOUT: 2 columns (settings left, live preview right)

LEFT — Settings Form:
  Business Name: [text input]
  Industry: [select] Restaurant / Clinic / Hotel / Home Services / Retail / Other

  Tone Selector (2x2 card grid, radio-button behavior):
  ┌────────────────┐ ┌────────────────┐
  │ 😊 Friendly    │ │ 👔 Professional│
  │ Warm, casual   │ │ Formal, clear  │
  └────────────────┘ └────────────────┘
  ┌────────────────┐ ┌────────────────┐
  │ 🤝 Personal    │ │ ✍️  Custom     │
  │ Uses names &   │ │ Write your own │
  │ specifics      │ │ system prompt  │
  └────────────────┘ └────────────────┘
  Selected card: GLOW CARD treatment

  Always include: [tag input — e.g. "our team", "come back soon"]
  Always avoid: [tag input — e.g. "your feedback is important"]

  [Save Brand Settings] PRIMARY

RIGHT — Live Preview (updates on every setting change):
  H3: "Live Preview"
  Sample review (locked): "Great service but the wait was a bit long. 4 stars."
  Generated reply box (re-generates as settings change)
  Label: "⚡ Generated with your current settings"
```

### 6.4 Billing Page

```
ROUTE: /app/settings/billing

Current Plan Card:
  Plan name + price + renewal date
  Feature list for current plan
  [Change Plan] → opens plan selector modal

Usage:
  "Replies this month: 60 / 100"
  Progress bar + "Resets in 12 days"

Payment Method:
  •••• •••• •••• 4242
  [Update Card]

Invoice History Table:
  Date | Amount | Status | Download
```

---

## 7. Animations & Motion

### Principles

- Entry: fade + translateY(8px → 0), opacity 0→1, 400ms ease-out
- Stagger: +50ms delay per item in a list
- Hover: translateY(-2px) + shadow increase, 150ms
- Focus: purple glow ring, 200ms
- No spinners — use skeleton screens

### Key Animations

```css
@keyframes heroIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes typingPulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}
```

### Reply Generation Flow (Critical UX)

```
1. User clicks "Generate Reply"
2. Button: spinner + "Thinking..."  (150ms delay)
3. Reply box appears with blinking cursor
4. Text types out (simulated, 20ms/char)
5. Cursor disappears, [Publish] button slides in
6. User clicks Publish → "Publishing..." → "✓ Published" (green)
7. Card gets 3px green left border
8. Card smoothly collapses and moves to Replied section
```

---

## 8. Responsive Behavior

```css
--breakpoint-sm:  640px;
--breakpoint-md:  768px;
--breakpoint-lg:  1024px;
--breakpoint-xl:  1280px;
```

### Landing Page

| Viewport | Changes |
|----------|---------|
| < 768px | H1: 4xl (not 7xl); steps go single-column; bento stacks vertically |
| < 640px | Nav collapses to hamburger; pricing cards stack; 1-column bento |

### Dashboard

| Viewport | Changes |
|----------|---------|
| < 1024px | Sidebar collapses to icon-only (48px) |
| < 768px | Sidebar becomes bottom tab bar; full-width content |

---

## 9. States

### Loading Skeleton

```
All loading states use skeleton screens, NOT spinners.

Review card skeleton:
- Line 1 (120px wide): author/date placeholder
- Lines 2-4: full-width, 90%, 70% gray bars
- Reply box: 180px tall gray rect
- Buttons: 3 small gray pills

Color: var(--bg-elevated) with shimmer overlay animation
```

### Empty — No Reviews Yet

```
SVG: Empty inbox with floating ⭐
H3: "No reviews yet"
Body: "Connect your Google Business Profile and reviews appear automatically."
CTA: [Connect Google Business Profile]  PRIMARY
```

### Empty — All Caught Up

```
SVG: Checkmark in circle, purple, confetti burst
H3: "You're all caught up! 🎉"
Body: "All reviews have been replied to."
CTA: [View Reply History →]  GHOST
```

### Error State

```
SVG: Warning triangle
H3: "Something went wrong"
Body: "We couldn't load your reviews. Usually temporary."
CTA: [Try Again]  + link to status page
```

### Limit Hit (Upgrade Prompt)

```
Inline banner in review queue (full-width, amber border):
⚠️ You've used all 100 replies this month.
    Upgrade to Growth for 500 replies.
[Upgrade Now →]
```

---

## 10. Copy & Tone

### Voice: Direct. Human. Confident.

- Direct — State the benefit, move on. No fluff.
- Never corporate — No "leverage", "synergy", "empower", "streamline"
- Human — "Your reviews, handled." not "Automated review response management platform"

### Headline Formula

```
✅ "Reply to every Google review. Automatically."
✅ "Two seconds. Every review. No excuses."
❌ "AI-powered review response automation for SMBs"
❌ "Streamline your review management workflow"
```

### CTA Copy

```
Primary:     "Start Free — No card needed"
             "Connect Google Business →"
Secondary:   "See how it works"
             "View pricing"

In-app:      "Generate Reply"  (not "AI Generate")
             "Publish to Google"  (not "Submit")
             "Regenerate"  (not "Try again")
```

### Error Copy

```
✅ "We couldn't connect to Google. Try again in a moment."
❌ "Error 503: Service Unavailable."

✅ "Your reply couldn't be published. Google may be temporarily unavailable."
❌ "API call failed with status 500."
```

---

## 11. File Structure

```
stareply.io/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                 ← Landing page
│   │   ├── pricing/page.tsx
│   │   └── blog/[slug]/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   └── (dashboard)/
│       └── app/
│           ├── page.tsx             ← Dashboard home
│           ├── reviews/page.tsx
│           ├── replies/page.tsx
│           └── settings/
│               ├── brand/page.tsx
│               ├── locations/page.tsx
│               ├── billing/page.tsx
│               └── notifications/page.tsx
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── StarRating.tsx
│   ├── reviews/
│   │   ├── ReviewCard.tsx           ← Core component
│   │   ├── ReplyBox.tsx
│   │   └── ReviewQueue.tsx
│   ├── marketing/
│   │   ├── Hero.tsx
│   │   ├── BentoGrid.tsx
│   │   └── Testimonials.tsx
│   └── layout/
│       ├── Navbar.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── supabase/
│   ├── google-business/
│   ├── claude/
│   │   └── generateReply.ts         ← Core AI function
│   └── stripe/
│
└── styles/
    └── globals.css                  ← All CSS vars defined here
```

---

*Pair this with: `PRD.md` and `USE_CASES.pdf`*
*Last updated: March 2026*
