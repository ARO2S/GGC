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
const HERO_IMAGE = '/images/hero1cropped.jpg';

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
      const raw = content.replace(/^#.*\n/m, '').trim();
      const dateVal = data.date instanceof Date
        ? data.date.toISOString()
        : data.date
          ? String(data.date)
          : '1970-01-01';

      return {
        slug: path.basename(f, '.md'),
        title: data.title || 'Untitled',
        date: dateVal,
        excerpt:
          data.excerpt ||
          (raw.length > 150 ? raw.substring(0, 150) + '...' : raw) ||
          '',
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
            <span className="font-lato text-sm font-bold text-garden-600">Join today &rarr;</span>
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
            <span className="font-lato text-sm font-bold text-garden-600">View schedule &rarr;</span>
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
            <span className="font-lato text-sm font-bold text-garden-600">Ask us &rarr;</span>
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
                priority={i === 0}
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
            View all &rarr;
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
