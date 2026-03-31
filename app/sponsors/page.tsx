import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Sponsor } from '@/components/Sponsors';

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

export default function SponsorsPage() {
  const sponsors = getSponsors();

  return (
    <>
      <Hero
        title="Our Sponsors"
        subtitle="We are grateful for the generous support of our community partners"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sponsors.length > 0 ? (
          <>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              The Greenville Garden Club is proud to partner with these local businesses and
              organizations whose support makes our programs and community events possible.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {sponsors.map((sponsor, index) => {
                const card = (
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center gap-4 hover:shadow-lg transition-shadow">
                    {sponsor.logo ? (
                      <div className="relative w-full h-24">
                        <Image
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          fill
                          className="object-contain"
                          sizes="(max-width: 640px) 40vw, 25vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-24 flex items-center justify-center bg-garden-50 rounded-lg">
                        <svg className="h-12 w-12 text-garden-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    <div className="text-center">
                      <h3 className="font-bold text-gray-900 text-lg">{sponsor.name}</h3>
                      {sponsor.description && (
                        <p className="text-gray-500 text-sm mt-1">{sponsor.description}</p>
                      )}
                      {sponsor.website && (
                        <span className="text-garden-600 text-sm mt-2 block">Visit their site →</span>
                      )}
                    </div>
                  </div>
                );

                return sponsor.website ? (
                  <a
                    key={index}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Visit ${sponsor.name}`}
                  >
                    {card}
                  </a>
                ) : (
                  <div key={index}>{card}</div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg className="h-16 w-16 text-garden-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Sponsors Yet</h3>
            <p className="text-gray-600 mb-6">
              Sponsor listings will appear here once they&apos;re added through the CMS.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                <strong>For Club Officers:</strong> Log in at{' '}
                <span className="font-mono">/admin</span> to add sponsors.
              </p>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Interested in becoming a sponsor?</p>
          <Link
            href="/join"
            className="inline-block px-6 py-3 bg-garden-600 text-white rounded-lg hover:bg-garden-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
