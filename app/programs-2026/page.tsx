import Hero from '@/components/Hero';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Program {
  slug: string;
  title: string;
  date: string;
  isoDate: string;
  time?: string;
  location: string;
  address?: string;
  description?: string;
  presenter?: string;
  refreshments?: string;
  notes?: string;
  lawnChairBloom?: boolean;
}

function getPrograms(): Program[] {
  const programsDir = path.join(process.cwd(), 'content/programs/2026');
  if (!fs.existsSync(programsDir)) return [];

  return fs
    .readdirSync(programsDir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace('.md', '');
      const fileContents = fs.readFileSync(path.join(programsDir, filename), 'utf8');
      const { data } = matter(fileContents);
      const dateObj = data.date ? new Date(data.date) : new Date(0);
      return {
        slug,
        title: data.title || '',
        date: dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        isoDate: dateObj.toISOString().split('T')[0],
        time: data.time || undefined,
        location: data.location || '',
        address: data.address || undefined,
        description: data.description || undefined,
        presenter: data.presenter || undefined,
        refreshments: data.refreshments || undefined,
        notes: data.notes || undefined,
        lawnChairBloom: data.lawnChairBloom || false,
      };
    })
    .sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
}

export default function Programs2026() {
  const today = new Date();
  const programs = getPrograms();

  return (
    <>
      <Hero
        title="2026 Programs"
        subtitle="Our full schedule of meetings, tours, and events for the year"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Join us throughout the year for meetings, garden tours, and hands-on learning.
            We hope to see you at every event!
          </p>
        </div>

        <div className="grid gap-6">
          {programs.map((program) => {
            const isPast = new Date(program.isoDate) < today;

            const cardContent = (
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-garden-800">{program.title}</h3>
                    {isPast && (
                      <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        Past
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {program.date}
                      {program.time && <span className="ml-1">· {program.time}</span>}
                    </span>

                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {program.location}
                      {program.address && <span className="ml-1 text-gray-500">· {program.address}</span>}
                    </span>
                  </div>

                  {program.presenter && (
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-garden-700">Presenter:</span> {program.presenter}
                    </p>
                  )}

                  {program.refreshments && (
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-garden-700">Refreshments:</span> {program.refreshments}
                    </p>
                  )}

                  {program.notes && (
                    <p className="text-sm text-gray-600 italic mt-2">{program.notes}</p>
                  )}

                  {program.lawnChairBloom && (
                    <p className="mt-3 inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Bring a lawn chair and a Bloom
                    </p>
                  )}

                  {isPast && (
                    <p className="mt-3 text-sm font-semibold text-garden-600 group-hover:text-garden-700">
                      View Recap →
                    </p>
                  )}
                </div>
              </div>
            );

            return (
              <Link
                key={program.slug}
                href={`/programs-2026/${program.slug}`}
                className="group block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-transparent hover:border-garden-200"
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
