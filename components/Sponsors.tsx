import Image from 'next/image';
import Link from 'next/link';

export interface Sponsor {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

interface SponsorsProps {
  sponsors: Sponsor[];
  compact?: boolean;
}

export default function Sponsors({ sponsors, compact = false }: SponsorsProps) {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-garden-800 mb-2 text-center">Our Sponsors</h2>
      <p className="text-center text-gray-600 mb-8">
        We are grateful for the generous support of our community sponsors.
      </p>

      {sponsors.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-garden-300 p-8 text-center">
          <p className="text-gray-500 mb-2">No sponsors listed yet.</p>
          <p className="text-sm text-gray-400">
            Club officers can add sponsors at{' '}
            <span className="font-mono text-garden-600">/admin</span> → Sponsors.
          </p>
        </div>
      ) : (
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sponsors.map((sponsor, index) => {
          const card = (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-shadow min-h-[120px]">
              {sponsor.logo ? (
                <div className="relative w-full h-16">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 15vw"
                  />
                </div>
              ) : (
                <div className="w-full h-16 flex items-center justify-center bg-garden-50 rounded">
                  <svg className="h-8 w-8 text-garden-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              )}
              <span className="text-sm font-semibold text-gray-800 text-center leading-tight">
                {sponsor.name}
              </span>
              {!compact && sponsor.description && (
                <span className="text-xs text-gray-500 text-center">{sponsor.description}</span>
              )}
            </div>
          );

          return sponsor.website ? (
            <a
              key={index}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
              title={`Visit ${sponsor.name}`}
            >
              {card}
            </a>
          ) : (
            <div key={index}>{card}</div>
          );
        })}
      </div>
      )}

      <div className="text-center mt-6">
        <Link
          href="/sponsors"
          className="text-garden-600 hover:text-garden-700 font-semibold text-sm"
        >
          Learn more about our sponsors →
        </Link>
      </div>
    </section>
  );
}
