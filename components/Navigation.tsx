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
