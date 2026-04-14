import Hero from '@/components/Hero';

export default function AnnualBooklet() {
  return (
    <>
      <Hero
        title="Annual Booklet"
        subtitle="Our club's mission, projects, leadership, and programs for the year"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="/booklet.pdf"
            className="w-full"
            style={{ height: '80vh', minHeight: '600px' }}
            title="Greenville Garden Club Annual Booklet"
          />
        </div>

        <div className="mt-4 text-center">
          <a
            href="/booklet.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-garden-700 text-white rounded-md hover:bg-garden-600 transition-colors text-sm font-medium"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </>
  );
}
