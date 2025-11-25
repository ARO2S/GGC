import Link from 'next/link';
import Hero from '@/components/Hero';
import PhotoGallery from '@/components/PhotoGallery';

export default function Home() {
  return (
    <>
      <Hero 
        title="Welcome to the Greenville Garden Club"
        subtitle="An active gardening community with programs and activities for all levels of interest and experience"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* About Section */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-garden-800 mb-6">About Our Club</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The Greenville Garden Club is an active group with programs and activities for all levels 
              of interest and experience. We have events every month of the year and there are many 
              opportunities to become involved. Come join us and make some gardening friends!
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Established in 1939, we are proud members of The Garden Clubs of Illinois (District V) 
              and the National Garden Clubs Central Region.
            </p>
          </div>
        </section>

        {/* Quick Links Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-garden-800 mb-8 text-center">Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Membership Card */}
            <Link href="/join" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full hover:shadow-xl transition-shadow border-t-4 border-garden-600">
                <div className="text-garden-600 mb-4">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-garden-600 transition-colors">
                  Become a Member
                </h3>
                <p className="text-gray-600">
                  Join our community of passionate gardeners and access exclusive programs and events.
                </p>
              </div>
            </Link>

            {/* Programs Card */}
            <Link href="/programs-2025" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full hover:shadow-xl transition-shadow border-t-4 border-garden-600">
                <div className="text-garden-600 mb-4">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-garden-600 transition-colors">
                  View Programs
                </h3>
                <p className="text-gray-600">
                  Explore our educational classes and workshops for 2025 and 2026.
                </p>
              </div>
            </Link>

            {/* Questions Card */}
            <Link href="/plant-questions" className="group">
              <div className="bg-white rounded-lg shadow-lg p-6 h-full hover:shadow-xl transition-shadow border-t-4 border-garden-600">
                <div className="text-garden-600 mb-4">
                  <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-garden-600 transition-colors">
                  Ask Plant Questions
                </h3>
                <p className="text-gray-600">
                  Have a gardening question? Our experienced members are here to help!
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* Latest Blog Posts Preview */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-garden-800">Latest Articles</h2>
            <Link href="/blog" className="text-garden-600 hover:text-garden-700 font-semibold">
              View All →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">
              Check back soon for gardening tips, club updates, and articles from our members.
            </p>
            <Link 
              href="/blog" 
              className="inline-block mt-4 px-6 py-3 bg-garden-600 text-white rounded-lg hover:bg-garden-700 transition-colors"
            >
              Visit Our Blog
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

