import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

interface ProgramDetailProps {
  params: Promise<{ slug: string }>;
}

async function getProgram(slug: string) {
  const programsDir = path.join(process.cwd(), 'content/programs/2026');
  const filePath = path.join(programsDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title || 'Program',
    date: data.date || '',
    time: data.time || '',
    location: data.location || '',
    address: data.address || '',
    description: data.description || '',
    presenter: data.presenter || null,
    refreshments: data.refreshments || null,
    notes: data.notes || null,
    lawnChairBloom: data.lawnChairBloom || false,
    blogSlug: data.blogSlug || null,
    pdf: data.pdf || null,
    images: data.images || [],
    contentHtml,
  };
}

async function getBlogPost(slug: string) {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return {
    title: data.title || '',
    excerpt: data.excerpt || data.description || '',
  };
}

export async function generateStaticParams() {
  const programsDir = path.join(process.cwd(), 'content/programs/2026');
  if (!fs.existsSync(programsDir)) return [];
  return fs
    .readdirSync(programsDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => ({ slug: f.replace('.md', '') }));
}

export default async function ProgramDetail({ params }: ProgramDetailProps) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();

  const blogPost = program.blogSlug ? await getBlogPost(program.blogSlug) : null;

  const formattedDate = program.date
    ? new Date(program.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const isPast = program.date ? new Date(program.date) < new Date() : false;

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back link */}
        <Link
          href="/programs-2026"
          className="text-garden-600 hover:text-garden-700 font-semibold inline-flex items-center mb-8"
        >
          <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Programs
        </Link>

        {/* Header */}
        <div className="mb-8">
          {isPast && (
            <div className="inline-block bg-garden-100 text-garden-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Past Event
            </div>
          )}
          <h1 className="text-4xl font-bold text-garden-800 mb-4">{program.title}</h1>

          <div className="flex flex-wrap gap-5 text-gray-600 text-sm mb-4">
            {formattedDate && (
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formattedDate}{program.time && ` · ${program.time}`}
              </span>
            )}
            {program.location && (
              <span className="flex items-center">
                <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {program.location}{program.address && `, ${program.address}`}
              </span>
            )}
          </div>

          {program.description && (
            <p className="text-lg text-gray-700">{program.description}</p>
          )}

          {program.presenter && (
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-semibold text-garden-700">Presenter:</span> {program.presenter}
            </p>
          )}

          {program.refreshments && (
            <p className="text-sm text-gray-700 mt-1">
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
        </div>

        {/* PDF download */}
        {program.pdf && (
          <div className="mb-6">
            <a
              href={program.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-garden-700 hover:bg-garden-800 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Program (PDF)
            </a>
          </div>
        )}

        {/* Blog post link */}
        {blogPost && program.blogSlug && (
          <div className="mb-8 p-5 bg-garden-50 border border-garden-200 rounded-lg">
            <p className="text-sm font-semibold text-garden-700 mb-1">Event Recap</p>
            <Link
              href={`/blog/${program.blogSlug}`}
              className="text-xl font-bold text-garden-800 hover:text-garden-600 transition-colors"
            >
              {blogPost.title} →
            </Link>
          </div>
        )}

        {/* Images */}
        {program.images.length > 0 && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {program.images.map((src: string, i: number) => (
              <img
                key={i}
                src={src}
                alt={`${program.title} photo ${i + 1}`}
                className="w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {/* Body content from markdown */}
        {program.contentHtml && (
          <div
            className="prose prose-lg max-w-none prose-headings:text-garden-800 prose-a:text-garden-600"
            dangerouslySetInnerHTML={{ __html: program.contentHtml }}
          />
        )}
      </div>
    </div>
  );
}
