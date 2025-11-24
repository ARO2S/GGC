import Hero from '@/components/Hero';

export default function History() {
  return (
    <>
      <Hero 
        title="Our History"
        subtitle="Celebrating decades of community, growth, and a passion for gardening"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-garden-800 mb-4">Established in 1939</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The Greenville Garden Club was founded in 1939 by a dedicated group of gardening 
              enthusiasts who shared a vision of creating a community centered around horticulture, 
              environmental stewardship, and the beautification of our town.
            </p>

            <h3 className="text-xl font-bold text-garden-800 mb-3 mt-8">Our Legacy</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              For over eight decades, our club has been an integral part of the Greenville community. 
              We have organized countless educational programs, community beautification projects, 
              plant sales, and social events that have brought together generations of gardeners.
            </p>

            <h3 className="text-xl font-bold text-garden-800 mb-3 mt-8">Affiliations</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              We are proud members of:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>The Garden Clubs of Illinois (District V)</li>
              <li>National Garden Clubs Central Region</li>
            </ul>

            <h3 className="text-xl font-bold text-garden-800 mb-3 mt-8">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Throughout our history, we have remained committed to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Promoting knowledge and love of gardening</li>
              <li>Encouraging environmental awareness and conservation</li>
              <li>Beautifying our community through various projects</li>
              <li>Providing educational opportunities for members and the public</li>
              <li>Supporting local horticultural initiatives and scholarships</li>
            </ul>

            <div className="mt-8 p-6 bg-garden-50 rounded-lg border-l-4 border-garden-600">
              <p className="text-gray-700 italic">
                "Our club continues to thrive thanks to the dedication of our members and their 
                shared passion for gardening. We look forward to many more years of growth, 
                learning, and community service."
              </p>
            </div>
          </div>
        </div>

        {/* CMS Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note for Club Officers:</strong> This page content can be edited through the 
            CMS admin panel. Log in at <span className="font-mono">/admin</span> to update the history 
            and add more details about your club's journey.
          </p>
        </div>
      </div>
    </>
  );
}

