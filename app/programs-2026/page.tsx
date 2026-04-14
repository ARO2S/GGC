import Hero from '@/components/Hero';
import Link from 'next/link';

export default function Programs2026() {
  const today = new Date();

  const programs = [
    {
      id: 0,
      title: 'White Oak Dedication Ceremony',
      date: 'March 25, 2026',
      isoDate: '2026-03-25',
      time: '3:00 PM',
      location: 'Bond County Courthouse Lawn',
      address: 'Greenville, IL',
      slug: 'white-oak-dedication-ceremony',
    },
    {
      id: 1,
      title: 'April Meeting',
      date: 'April 14, 2026',
      isoDate: '2026-04-14',
      location: '1st Baptist Church',
      address: '218 E. South St, Greenville',
      presenter: 'Executive Committee',
      refreshments: 'The Greenville Garden Club',
    },
    {
      id: 2,
      title: "Meyer's Nursery Tour",
      date: 'April 28, 2026',
      isoDate: '2026-04-28',
      location: "Meyer's Nursery",
      address: '14711 W. St. Louis St, Nashville',
      presenter: 'On Your Own',
      refreshments: "Eat in Nashville – Bonnie's",
      notes: 'Meet at First United Methodist at 9:00 for Car Pool',
    },
    {
      id: 3,
      title: 'Annual Plant Sale',
      date: 'Saturday, May 2, 2026',
      isoDate: '2026-05-02',
      time: '8:00 AM – 12:00 Noon',
      location: 'H.S.H.S. Thrift Store Parking Lot',
      notes: 'Cash or Check ONLY',
    },
    {
      id: 4,
      title: 'Tour & Mushrooms',
      date: 'May 12, 2026',
      isoDate: '2026-05-12',
      location: 'Carla & Randy Smith',
      address: '414 Eastern, Greenville',
      presenter: 'Randy Smith',
      lawnChairBloom: true,
    },
    {
      id: 5,
      title: 'Show and Tell – Favorite House Plants',
      date: 'May 26, 2026',
      isoDate: '2026-05-26',
      location: 'Dave & Diane Doll',
      address: '4067 Quail Rd, Pocahontas',
      presenter: 'Members – Show and Tell',
      notes: 'Members are to bring their favorite House Plant and share your tips on growing.',
      lawnChairBloom: true,
    },
    {
      id: 6,
      title: 'Shade Gardening',
      date: 'June 9, 2026',
      isoDate: '2026-06-09',
      location: 'Emerald Pointe',
      address: '105 Honey Locust Ln.',
      presenter: 'Pat Kious',
      lawnChairBloom: true,
    },
    {
      id: 7,
      title: 'Tour & Day Lilies Display',
      date: 'June 23, 2026',
      isoDate: '2026-06-23',
      location: 'Randy & Kalene Zerkel',
      address: '1081 Cottonwood, Greenville',
      presenter: 'Randy & Kalene Zerkel',
      lawnChairBloom: true,
    },
    {
      id: 8,
      title: 'Cut Flowers',
      date: 'July 14, 2026',
      isoDate: '2026-07-14',
      location: 'Stoecklin Orchard',
      address: '1709 Ayers Rd',
      presenter: 'Chris Lueking',
      lawnChairBloom: true,
    },
    {
      id: 9,
      title: 'Herb Gardening',
      date: 'July 28, 2026',
      isoDate: '2026-07-28',
      location: 'Emerald Pointe',
      address: '105 Honey Locust Ln.',
      presenter: 'County Extension',
      lawnChairBloom: true,
    },
    {
      id: 10,
      title: 'Bonsai',
      date: 'August 11, 2026',
      isoDate: '2026-08-11',
      location: 'Bill & Sharon Ahern',
      address: '819 N. Locust',
      presenter: 'Bill Ahern',
      lawnChairBloom: true,
    },
    {
      id: 11,
      title: 'Pecan Farming',
      date: 'August 25, 2026',
      isoDate: '2026-08-25',
      location: 'Voss Pecan Orchard',
      address: '10101 Slant Rd, Carlyle',
      presenter: 'Ralph & Karen Voss',
      lawnChairBloom: true,
    },
    {
      id: 12,
      title: 'Year-End Wrap & Elections',
      date: 'September 8, 2026',
      isoDate: '2026-09-08',
      location: 'Milk House',
      address: 'Rt. 127 & Idler Ln., Greenville',
      presenter: 'Executive Committee',
    },
    {
      id: 13,
      title: 'Christmas Party',
      date: 'December 8, 2026',
      isoDate: '2026-12-08',
      location: '1st Baptist Church',
      address: '218 E. South St., Greenville',
      presenter: 'Garden Club',
      refreshments: 'Executive Comm. & Irene Seale, Jane Crouch',
      notes: 'Bring Finger Food &/or Holiday Treats · $10 (Wrapped) Gift Exchange',
    },
  ];

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
            const hasDetail = 'slug' in program && program.slug;
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
                      {'time' in program && program.time && (
                        <span className="ml-1">· {program.time}</span>
                      )}
                    </span>

                    <span className="flex items-center">
                      <svg className="h-5 w-5 mr-1 text-garden-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {program.location}
                      {'address' in program && program.address && (
                        <span className="ml-1 text-gray-500">· {program.address}</span>
                      )}
                    </span>
                  </div>

                  {'presenter' in program && program.presenter && (
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-garden-700">Presenter:</span> {program.presenter}
                    </p>
                  )}

                  {'refreshments' in program && program.refreshments && (
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-semibold text-garden-700">Refreshments:</span> {program.refreshments}
                    </p>
                  )}

                  {'notes' in program && program.notes && (
                    <p className="text-sm text-gray-600 italic mt-2">{program.notes}</p>
                  )}

                  {'lawnChairBloom' in program && program.lawnChairBloom && (
                    <p className="mt-3 inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                      Bring a lawn chair and a Bloom
                    </p>
                  )}

                  {isPast && hasDetail && (
                    <p className="mt-3 text-sm font-semibold text-garden-600 group-hover:text-garden-700">
                      View Recap →
                    </p>
                  )}
                </div>
              </div>
            );

            if (isPast && hasDetail) {
              return (
                <Link
                  key={program.id}
                  href={`/programs-2026/${'slug' in program ? program.slug : ''}`}
                  className="group block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border border-transparent hover:border-garden-200"
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div key={program.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
