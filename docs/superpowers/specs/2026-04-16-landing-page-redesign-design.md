# Landing Page Redesign — Design Spec
**Date:** 2026-04-16
**Status:** Approved

---

## Summary

Redesign the Greenville Garden Club landing page (`app/page.tsx`, `components/Hero.tsx`) from the current dark-green card layout to a full-bleed photography magazine style. The goal is a more inviting, visually rich first impression that feels modern without losing the club's heritage identity.

---

## Design Decisions

### Overall Direction
**Full Bleed Photography Magazine** — garden photography fills the entire hero viewport with a dark overlay, large serif headline sits over the image. Contemporary, immersive, visually rich. Inspired by high-end lifestyle/garden magazines.

### Typography
- **Headlines:** Playfair Display (serif, italic for hero) — already available via Google Fonts or can be added
- **Body / UI text:** Lato (existing Inter can stay for body; Lato added for nav/labels/CTAs)
- **Fallback:** Georgia, serif for headlines; system sans-serif for body

### Color Palette
Existing `garden` and `earth` Tailwind tokens are kept. Additional tokens need to be added to `tailwind.config.ts`:

**Existing tokens used:**
- `garden-600` / `#16a34a` — primary CTA buttons, icon accents, links
- `garden-300` / `#86efac` — stat numbers, footer headings, accent text on dark

**New tokens to add under `garden`:**
- `garden-850: '#1a3320'` — stats bar, footer background, dark surfaces (distinct from existing `garden-900: #14532d`)
- `garden-860: '#142a1a'` — footer copyright strip (deepest dark)

**New tokens to add under `earth` or as standalone:**
- `surface: '#fafaf7'` — off-white content area background
- `surface-warm: '#f0f0e8'` — sponsors bar background

**Photo overlay:** `rgba(5,20,10,0.35)` top → `rgba(5,20,10,0.78)` bottom (inline style, no token needed)

---

## Page Structure

### 1. Navigation
- Background: `rgba(10,30,15,0.95)` with `backdrop-filter: blur(8px)` — dark, slightly translucent
- Left: Logo medallion (44×44px circular white badge with the existing `logo.png`)
- Right: Nav links (History, Programs, Blog, Plant Questions) + "Join Us" pill CTA button in `garden-600`
- Border-bottom: subtle `rgba(255,255,255,0.08)`

### 2. Hero
- **Height:** `min-h-[520px]` on mobile, `lg:min-h-[640px]` on desktop
- **Background:** Full-bleed image with gradient overlay (dark at bottom for text legibility). Hero image sourced from the site's own gallery (`content/gallery/` or `public/images/uploads/`) — pick a visually strong landscape shot. Fall back to an Unsplash garden photo if no suitable owned photo exists.
- **Content anchored to bottom-left:**
  - Logo lockup: 96×96px circular white medallion (`logo.png`) beside the headline text
  - Eyebrow: `"Established 1939 · Greenville, Illinois"` — uppercase, spaced, muted white
  - Headline: `"Grow With Us"` — Playfair Display, ~3.2rem, white, italic
  - Subheadline: club tagline sentence — muted white, max-width ~360px
  - Actions row: white pill "Join the Club" button + ghost "View 2026 Programs →" link

### 3. Stats Bar
- Background: `garden-900` (`#1a3320`)
- Three columns, centered, divided by subtle borders:
  - **85+** / Years Active
  - **12** / Events Per Year
  - **Est. 1939** / Club Heritage
- Numbers in Playfair Display, `garden-300` green
- Labels in Lato, uppercase, muted green

### 4. Action Cards (Get Involved)
- Section label: uppercase spaced `"GET INVOLVED"` in `garden-600`
- Three equal-width cards on `#fafaf7` background, `padding: 40px 36px`
- Each card: white background, `rounded-xl`, subtle border + shadow
- Icon: 40×40px `rounded-lg` `#f0fdf4` background with a 22px SVG stroke icon in `garden-600`
- **Card 1 — Become a Member:** people/group SVG → `/join`
- **Card 2 — 2026 Programs:** calendar SVG → `/programs-2026`
- **Card 3 — Ask a Plant Question:** speech-bubble SVG → `/plant-questions`
- Each card has: icon, title (Playfair Display), description (Lato), colored "→" link at bottom

### 5. Photo Strip
- Three-column grid, `height: 200px`, `gap: 3px` (no border-radius — bleeds edge to edge)
- Column proportions: `2fr 1fr 1fr`
- Images sourced from the existing gallery (`content/gallery/` markdown files → `data.image` field)
- If fewer than 3 photos exist, repeat or use a green gradient placeholder

### 6. Latest Articles
- Section heading: "Latest Articles" in Playfair Display + "View all →" link right-aligned
- Two-column card grid
- Each card: white background, rounded, thumbnail image area (100px tall gradient/photo), date, title (Playfair Display), excerpt (Lato)
- Pulls from existing `getBlogPosts()` logic (top 2 posts instead of 3)

### 7. Sponsors Bar
- Background: `#f0f0e8`, top border
- Label: `"OUR SPONSORS"` uppercase, muted
- Sponsor names/logos displayed as white pill badges — existing `Sponsors` component can be adapted or replaced inline

### 8. Footer
- Background: `#1a3320` (dark green)
- Three columns: brand description left, Quick Links center, Connect right
- Bottom strip: `#142a1a`, copyright centered
- Replaces existing `Footer` component styling

---

## Component Changes

| Component | Change |
|---|---|
| `components/Hero.tsx` | Full rewrite of the `showLogo` hero variant. Standard inner-page variant unchanged. |
| `app/page.tsx` | Replace About section with stats bar. Replace quick-links cards with new action-card design. Replace `<PhotoCarousel>` with static photo strip. Keep blog section, reduce to 2 posts. Keep sponsors. |
| `components/Navigation.tsx` | Restyle: dark translucent bg, logo medallion left, pill CTA button added. |
| `components/Footer.tsx` | Restyle: match new dark green palette, 3-column layout. |
| `app/globals.css` | Add Google Fonts import for Playfair Display + Lato. |
| `tailwind.config.ts` | Add `garden-850`, `garden-860`, `surface`, `surface-warm` tokens (see Color Palette section). |

---

## Out of Scope
- Inner pages (History, Programs, Blog, etc.) — navigation and footer changes will flow through to those automatically, but their hero/content sections are not redesigned here.
- CMS / content structure — no changes to `content/` markdown files.
- Mobile responsiveness — implement responsively but no separate mobile-specific design was reviewed; follow standard Tailwind responsive breakpoints.

---

## Hero Photo
Use the best available photo from `public/images/uploads/` (the WhiteOak series or iOS uploads). If none are suitable as a full-bleed hero, use an Unsplash garden photo with appropriate attribution or licensing. The photo URL is passed as a prop to `Hero` — the implementation should make this easy to swap.
