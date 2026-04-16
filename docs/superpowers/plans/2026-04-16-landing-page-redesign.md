# Landing Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Greenville Garden Club homepage from a plain dark-green card layout to a full-bleed photography magazine style with a prominent logo lockup, stats bar, action cards with SVG icons, a photo strip, and refreshed navigation and footer.

**Architecture:** Five sequential file edits — foundation first (tokens + fonts), then each visual component (Nav, Hero, Footer), then the homepage itself. Each task is independently committable and leaves the site in a working state.

**Tech Stack:** Next.js 14 App Router, Tailwind CSS v3, TypeScript, `next/font/google` for Playfair Display + Lato, existing `gray-matter` for content, existing `next/image` for photos.

---

## File Map

| File | Change |
|---|---|
| `tailwind.config.ts` | Add `garden.850`, `garden.860`, `surface.DEFAULT`, `surface.warm` color tokens + `fontFamily.playfair` + `fontFamily.lato` |
| `app/layout.tsx` | Load Playfair Display + Lato via `next/font/google`, expose as CSS vars, swap body bg to `bg-surface` |
| `app/globals.css` | Remove conflicting CSS-variable body background; keep Tailwind directives only |
| `components/Navigation.tsx` | Full rewrite — dark translucent bg, circular logo medallion, pill Join CTA |
| `components/Hero.tsx` | Rewrite `showLogo` branch only — full-bleed photo, bottom-left logo+headline lockup; inner-page branch untouched |
| `components/Footer.tsx` | Full rewrite — dark green 3-column layout matching new palette |
| `app/page.tsx` | Full rewrite — remove About + PhotoCarousel + old quick-links; add stats bar, action cards, photo strip, 2-post blog section |

---

## Task 1: Tailwind tokens + font setup

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Update `tailwind.config.ts`**

Replace the entire file with:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          850: '#1a3320',
          860: '#142a1a',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#faf8f5',
          100: '#f5f1e8',
          200: '#e8dfc9',
          300: '#d9c9a3',
          400: '#c7ae7d',
          500: '#b69560',
          600: '#a07d4d',
          700: '#856642',
          800: '#6e5439',
          900: '#5c4630',
          950: '#312418',
        },
        surface: {
          DEFAULT: '#fafaf7',
          warm: '#f0f0e8',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        lato: ['var(--font-lato)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Update `app/layout.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Greenville Garden Club",
  description: "An active gardening community with programs and activities for all levels of interest and experience.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo.png', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${playfair.variable} ${lato.variable} flex flex-col min-h-screen bg-surface`}
      >
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Clean up `app/globals.css`**

The existing `globals.css` has CSS-variable-driven body background/color rules that conflict with the new `bg-surface` Tailwind class on the body. Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /home/andyr/GGC && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
cd /home/andyr/GGC
git add tailwind.config.ts app/layout.tsx app/globals.css
git commit -m "feat: add Playfair Display + Lato fonts and new Tailwind color tokens"
```

---

## Task 2: Navigation redesign

**Files:**
- Modify: `components/Navigation.tsx`

- [ ] **Step 1: Replace `components/Navigation.tsx`**

```tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'History', href: '/history' },
    { name: '2026 Programs', href: '/programs-2026' },
    { name: 'Blog', href: '/blog' },
    { name: 'Plant Questions', href: '/plant-questions' },
    { name: 'Annual Booklet', href: '/booklet' },
  ];

  return (
    <nav className="bg-garden-950/95 backdrop-blur-sm text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo medallion */}
          <Link href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
            <div className="h-11 w-11 rounded-full bg-white overflow-hidden shadow-md flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Greenville Garden Club"
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-lato text-white/75 hover:text-white transition-colors tracking-wide"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/join"
              className="ml-4 px-5 py-2 bg-garden-600 rounded-full text-sm font-lato font-bold text-white hover:bg-garden-500 transition-colors"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:bg-garden-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-garden-950 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-lato text-white/80 hover:text-white hover:bg-garden-800 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/join"
              className="block mt-2 px-3 py-2 bg-garden-600 rounded-full text-base font-lato font-bold text-white text-center hover:bg-garden-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Join Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/andyr/GGC && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/andyr/GGC
git add components/Navigation.tsx
git commit -m "feat: redesign navigation with dark translucent bg, logo medallion, and join CTA"
```

---

## Task 3: Hero component redesign (showLogo variant)

**Files:**
- Modify: `components/Hero.tsx`

The inner-page hero (used by History, Programs, Blog, etc.) is **not changed** — only the `showLogo` branch is rewritten.

- [ ] **Step 1: Replace `components/Hero.tsx`**

```tsx
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showLogo?: boolean;
}

export default function Hero({ title, subtitle, backgroundImage, showLogo }: HeroProps) {

  if (showLogo) {
    const bgStyle = backgroundImage
      ? {
          backgroundImage: `linear-gradient(to bottom, rgba(5,20,10,0.35) 0%, rgba(5,20,10,0.78) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          background: 'linear-gradient(to bottom, #052e16, #14532d)',
        };

    return (
      <div
        className="relative flex flex-col justify-end min-h-[520px] lg:min-h-[640px] text-white"
        style={bgStyle}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-12 sm:pb-16">

          {/* Logo + headline lockup */}
          <div className="flex items-end gap-5 mb-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white overflow-hidden shadow-2xl ring-2 ring-white/25 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Greenville Garden Club"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-lato text-xs sm:text-sm uppercase tracking-[0.22em] text-white/60 mb-1">
                Established 1939 · Greenville, Illinois
              </p>
              <h1 className="font-playfair italic text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
                {title}
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="font-lato text-base sm:text-lg text-white/70 max-w-md mb-6 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <a
              href="/join"
              className="px-6 py-3 bg-white rounded-full font-lato font-bold text-sm text-garden-900 hover:bg-garden-50 transition-colors"
            >
              Join the Club
            </a>
            <a
              href="/programs-2026"
              className="font-lato text-sm text-white/70 border-b border-white/40 pb-px hover:text-white hover:border-white transition-colors"
            >
              View 2026 Programs →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Standard centered hero for inner pages — unchanged ──
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(5, 46, 22, 0.82), rgba(5, 46, 22, 0.82)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  return (
    <div
      className="relative bg-garden-900 text-white py-16 px-4 sm:py-24"
      style={bgStyle}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-garden-400 via-garden-300 to-garden-500" />
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-garden-100 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/andyr/GGC && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/andyr/GGC
git add components/Hero.tsx
git commit -m "feat: redesign homepage hero with full-bleed photo and logo-beside-headline lockup"
```

---

## Task 4: Footer redesign

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Replace `components/Footer.tsx`**

```tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-garden-850 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-white overflow-hidden flex items-center justify-center shadow flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Greenville Garden Club"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="font-playfair text-garden-100 text-lg leading-snug">
                Greenville Garden Club
              </span>
            </div>
            <p className="font-lato text-sm text-garden-300/70 leading-relaxed">
              Established in 1939, we are proud members of The Garden Clubs of Illinois (District V)
              and the National Garden Clubs Central Region.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-lato text-xs font-bold tracking-[0.18em] uppercase text-garden-300 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Our History', href: '/history' },
                { name: 'Become a Member', href: '/join' },
                { name: 'Plant Questions', href: '/plant-questions' },
                { name: 'Blog & Articles', href: '/blog' },
                { name: 'Annual Booklet', href: '/booklet' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-lato text-sm text-garden-300/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-lato text-xs font-bold tracking-[0.18em] uppercase text-garden-300 mb-5">
              Connect
            </h3>
            <p className="font-lato text-sm text-garden-300/70 mb-4 leading-relaxed">
              Follow us on social media for the latest events and gardening tips.
            </p>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-garden-300/70 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="font-lato text-sm">Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="bg-garden-860 text-center py-4">
        <p className="font-lato text-xs text-garden-300/50">
          &copy; {currentYear} Greenville Garden Club. All rights reserved.
        </p>
        {/* Hidden link so Netlify's form crawler can find the static form registration page */}
        <Link href="/netlify-forms.html" className="sr-only" aria-hidden>Form registration</Link>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/andyr/GGC && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd /home/andyr/GGC
git add components/Footer.tsx
git commit -m "feat: redesign footer with dark green palette, logo, and 3-column layout"
```

---

## Task 5: Homepage redesign

**Files:**
- Modify: `app/page.tsx`

This task replaces the entire page body. The `getBlogPosts`, `getGalleryPhotos`, and `getSponsors` server functions are kept with one change: `getBlogPosts` is reduced to 2 posts (`.slice(0, 2)`). The `PhotoCarousel` import is removed. The About section and old quick-links grid are removed.

The hero photo is set to `/images/uploads/WhiteOak (1).JPG` — a landscape-oriented garden photo from the club's gallery. **After implementing, start the dev server and check the hero visually. If the photo is not suitable (portrait, too dark, wrong subject), swap `HERO_IMAGE` to another file from `public/images/uploads/`.**

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Sponsors, { Sponsor } from '@/components/Sponsors';
import BlogCard from '@/components/BlogCard';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ── Hero background image ──────────────────────────────────────────────────
// Preview at /images/uploads/WhiteOak (1).JPG — swap if not suitable.
const HERO_IMAGE = '/images/uploads/WhiteOak (1).JPG';

// ── Data loaders ───────────────────────────────────────────────────────────

interface GalleryPhoto {
  src: string;
  alt: string;
  order: number;
}

function getBlogPosts() {
  const dir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        slug: f.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt:
          data.excerpt ||
          content
            .replace(/^#.*\n/m, '')
            .trim()
            .substring(0, 150) + '...',
        author: data.author,
        image: data.image,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);
}

function getGalleryPhotos(): GalleryPhoto[] {
  const dir = path.join(process.cwd(), 'content/gallery');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        src: data.image || '',
        alt: data.title || 'Garden photo',
        order: data.order ?? 99,
      };
    })
    .filter((p) => p.src)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);
}

function getSponsors(): Sponsor[] {
  const dir = path.join(process.cwd(), 'content/sponsors');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return {
        name: data.name || 'Sponsor',
        logo: data.logo || undefined,
        website: data.website || undefined,
        description: data.description || undefined,
        order: data.order ?? 99,
      };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  const galleryPhotos = getGalleryPhotos();
  const sponsors = getSponsors();
  const recentPosts = getBlogPosts();

  // Always render 3 slots; fill missing with null for gradient placeholders
  const stripPhotos: (GalleryPhoto | null)[] = [
    ...galleryPhotos,
    ...Array(Math.max(0, 3 - galleryPhotos.length)).fill(null),
  ];

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title="Grow With Us"
        subtitle="An active gardening community with programs and activities for all levels of interest and experience."
        backgroundImage={HERO_IMAGE}
        showLogo
      />

      {/* ── Stats bar ── */}
      <div className="bg-garden-850 flex justify-center divide-x divide-white/10">
        {[
          { value: '85+', label: 'Years Active' },
          { value: '12', label: 'Events Per Year' },
          { value: 'Est. 1939', label: 'Club Heritage' },
        ].map(({ value, label }) => (
          <div key={label} className="flex-1 max-w-[200px] text-center py-4 px-4">
            <div className="font-playfair text-2xl text-garden-300">{value}</div>
            <div className="font-lato text-[0.65rem] uppercase tracking-widest text-garden-300/70 mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Action cards ── */}
      <section className="bg-surface max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
        <p className="font-lato text-xs font-bold uppercase tracking-[0.2em] text-garden-600 mb-6">
          Get Involved
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          {/* Membership */}
          <Link
            href="/join"
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-garden-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
              </svg>
            </div>
            <h3 className="font-playfair text-lg text-garden-900">Become a Member</h3>
            <p className="font-lato text-sm text-gray-500 leading-relaxed flex-1">
              Join our community of passionate gardeners and access exclusive programs and events.
            </p>
            <span className="font-lato text-sm font-bold text-garden-600">Join today →</span>
          </Link>

          {/* Programs */}
          <Link
            href="/programs-2026"
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-garden-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="font-playfair text-lg text-garden-900">2026 Programs</h3>
            <p className="font-lato text-sm text-gray-500 leading-relaxed flex-1">
              Explore our educational classes and workshops for all levels of experience.
            </p>
            <span className="font-lato text-sm font-bold text-garden-600">View schedule →</span>
          </Link>

          {/* Plant Questions */}
          <Link
            href="/plant-questions"
            className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-3"
          >
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-garden-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h3 className="font-playfair text-lg text-garden-900">Ask a Plant Question</h3>
            <p className="font-lato text-sm text-gray-500 leading-relaxed flex-1">
              Have a gardening question? Our experienced members are here to help.
            </p>
            <span className="font-lato text-sm font-bold text-garden-600">Ask us →</span>
          </Link>

        </div>
      </section>

      {/* ── Photo strip ── */}
      <div
        className="grid h-48 sm:h-56 gap-[3px]"
        style={{ gridTemplateColumns: '2fr 1fr 1fr' }}
      >
        {stripPhotos.map((photo, i) =>
          photo ? (
            <div key={photo.src} className="relative overflow-hidden bg-garden-200">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes={i === 0 ? '50vw' : '25vw'}
              />
            </div>
          ) : (
            <div
              key={i}
              className="bg-gradient-to-br from-garden-200 to-garden-400"
            />
          )
        )}
      </div>

      {/* ── Blog posts ── */}
      <section className="bg-surface max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">
        <div className="flex justify-between items-baseline mb-8">
          <h2 className="font-playfair text-3xl text-garden-900">Latest Articles</h2>
          <Link
            href="/blog"
            className="font-lato text-sm font-bold text-garden-600 hover:text-garden-700 transition-colors"
          >
            View all →
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
            <p className="font-lato text-gray-500">
              Check back soon for gardening tips and club updates.
            </p>
            <Link
              href="/blog"
              className="inline-block mt-4 px-6 py-3 bg-garden-600 text-white rounded-full font-lato font-bold text-sm hover:bg-garden-700 transition-colors"
            >
              Visit Our Blog
            </Link>
          </div>
        )}
      </section>

      {/* ── Sponsors ── */}
      <div className="bg-surface-warm border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
          <Sponsors sponsors={sponsors} compact />
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /home/andyr/GGC && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and visually verify**

```bash
cd /home/andyr/GGC && npm run dev
```

Open `http://localhost:3000` and check:
- Hero: full-bleed photo with dark overlay, logo medallion + "Grow With Us" headline bottom-left
- If `WhiteOak (1).JPG` is not a suitable landscape photo, update `HERO_IMAGE` in `app/page.tsx` to another file from `public/images/uploads/` and re-check
- Stats bar: dark green strip with 85+, 12, Est. 1939
- Action cards: three white cards with SVG icons (people, calendar, speech bubble)
- Photo strip: 3-column strip using gallery photos or green gradient placeholders
- Blog: 2-column grid
- Footer: dark green, 3-column

Also open an inner page (e.g., `http://localhost:3000/history`) and confirm the inner-page hero is unchanged.

- [ ] **Step 4: Commit**

```bash
cd /home/andyr/GGC
git add app/page.tsx
git commit -m "feat: redesign homepage with photo hero, stats bar, action cards, and photo strip"
```

---

## Task 6: Production build check

- [ ] **Step 1: Run full build**

```bash
cd /home/andyr/GGC && npm run build
```

Expected: Build completes with no errors. Warnings about image optimization are acceptable.

- [ ] **Step 2: Commit build confirmation (no files changed)**

No commit needed — this is a verification step only. If the build fails, fix the error in the relevant task's file, then re-run the build.
