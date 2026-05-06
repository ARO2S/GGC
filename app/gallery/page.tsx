import Link from 'next/link';
import { getAllPhotos, getAllTags, formatTagLabel } from '@/lib/gallery';

export const metadata = {
  title: 'Photo Gallery | Greenville Garden Club',
  description: 'Browse photos from Greenville Garden Club events and garden blooms.',
};

export default function GalleryPage() {
  const photos = getAllPhotos();
  const tags = getAllTags();

  const tagPreviews = tags.map((tag) => {
    const tagPhotos = photos.filter((p) => p.tags.includes(tag));
    return {
      tag,
      label: formatTagLabel(tag),
      count: tagPhotos.length,
      preview: tagPhotos[0]?.image ?? null,
    };
  });

  const untagged = photos.filter((p) => p.tags.length === 0);

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="bg-garden-950 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-3">Photo Gallery</h1>
          <p className="text-white/70 font-lato text-lg">
            {photos.length} photo{photos.length !== 1 ? 's' : ''} from events, blooms, and club life
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* All Photos link */}
        <div className="mb-10">
          <Link
            href="/gallery/all"
            className="inline-flex items-center gap-3 bg-white border border-garden-200 rounded-xl px-6 py-4 shadow-sm hover:shadow-md hover:border-garden-400 transition-all group"
          >
            <div className="w-10 h-10 bg-garden-100 rounded-lg flex items-center justify-center group-hover:bg-garden-200 transition-colors">
              <svg className="w-5 h-5 text-garden-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-garden-900 font-lato">All Photos</p>
              <p className="text-sm text-gray-500">{photos.length} photos</p>
            </div>
            <svg className="w-5 h-5 text-garden-400 ml-auto group-hover:text-garden-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Tag categories */}
        {tagPreviews.length > 0 && (
          <>
            <h2 className="text-xl font-playfair font-bold text-garden-900 mb-5">Browse by Tag</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {tagPreviews.map(({ tag, label, count, preview }) => (
                <Link
                  key={tag}
                  href={`/gallery/${tag}`}
                  className="group bg-white rounded-xl overflow-hidden border border-garden-100 shadow-sm hover:shadow-md hover:border-garden-300 transition-all"
                >
                  {/* Preview image */}
                  <div className="h-40 bg-garden-100 overflow-hidden">
                    {preview ? (
                      <img
                        src={preview}
                        alt={label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-garden-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Label */}
                  <div className="px-4 py-3">
                    <p className="font-semibold text-garden-900 font-lato group-hover:text-garden-700 transition-colors">{label}</p>
                    <p className="text-sm text-gray-500">{count} photo{count !== 1 ? 's' : ''}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Untagged note */}
        {untagged.length > 0 && tags.length === 0 && (
          <p className="text-gray-500 text-sm mt-8">
            No photos have been tagged yet. Tags can be added in the CMS.
          </p>
        )}
      </div>
    </div>
  );
}
