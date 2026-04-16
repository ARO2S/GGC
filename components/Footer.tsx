import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  // Stamped at build time (static export). Rebuild at year-end to update.
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
              href="https://facebook.com" // TODO: replace with club Facebook page URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-garden-300/70 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
        <Link href="/netlify-forms.html" className="sr-only" aria-hidden tabIndex={-1}>Form registration</Link>
      </div>
    </footer>
  );
}
