import Hero from '@/components/Hero';

export default function Programs2025() {
  // This data will eventually come from CMS
  const programs = [
    {
      id: 1,
      title: 'Spring Garden Planning',
      date: 'January 15, 2025',
      time: '7:00 PM',
      description: 'Learn how to plan your spring garden for maximum yield and beauty. Topics include seed selection, companion planting, and garden layout.',
      location: 'Community Center',
    },
    {
      id: 2,
      title: 'Pruning Workshop',
      date: 'February 20, 2025',
      time: '10:00 AM',
      description: 'Master the art of pruning with hands-on demonstrations. Bring your own tools and learn proper techniques for fruit trees, roses, and shrubs.',
      location: 'Smith Garden',
    },
    {
      id: 3,
      title: 'Container Gardening',
      date: 'March 10, 2025',
      time: '2:00 PM',
      description: 'Perfect for small spaces! Discover creative container gardening ideas and learn about soil mixes, watering, and plant selection.',
      location: 'Community Center',
    },
    {
      id: 4,
      title: 'Native Plants for Pollinators',
      date: 'April 5, 2025',
      time: '6:30 PM',
      description: 'Support local ecosystems by planting native species that attract bees, butterflies, and hummingbirds.',
      location: 'Library Meeting Room',
    },
    {
      id: 5,
      title: 'Organic Pest Control',
      date: 'May 18, 2025',
      time: '1:00 PM',
      description: 'Learn natural methods to protect your garden from pests without harmful chemicals.',
      location: 'Community Center',
    },
  ];

  return (
    <>
      <Hero 
        title="2025 Programs"
        subtitle="Educational classes and workshops for gardeners of all skill levels"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            Join us for our 2025 program series featuring expert speakers, hands-on workshops, 
            and educational sessions designed to enhance your gardening knowledge and skills.
          </p>
        </div>

        <div className="grid gap-6">
          {programs.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-garden-800 mb-2">{program.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {program.date}
                    </span>
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {program.time}
                    </span>
                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {program.location}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{program.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CMS Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note for Club Officers:</strong> These programs can be managed through the 
            CMS admin panel. Log in at <span className="font-mono">/admin</span> to add, edit, or remove programs.
          </p>
        </div>
      </div>
    </>
  );
}

