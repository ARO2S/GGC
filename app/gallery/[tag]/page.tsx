import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPhotos, getAllTags, getPhotosByTag, formatTagLabel } from '@/lib/gallery';

interface TagGalleryProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  const params = tags.map((tag) => ({ tag }));
  // Always include the "all" pseudo-tag
  params.push({ tag: 'all' });
  return params;
}

export async function generateMetadata({ params }: TagGalleryProps) {
  const { tag } = await params;
  const label = tag === 'all' ? 'All Photos' : formatTagLabel(tag);
  return {
    title: `${label} | Photo Gallery | Greenville Garden Club`,
  };
}

export default async function TagGalleryPage({ params }: TagGalleryProps) {
  const { tag } = await params;

  const isAll = tag === 'all';
  const photos = isAll ? getAllPhotos() : getPhotosByTag(tag);
  const allTags = getAllTags();

  if (!isAll && !allTags.includes(tag)) notFound();

  const label = isAll ? 'All Photos' : formatTagLabel(tag);

  return (
    <div className="bg-surface min-h-screen">
      {/* Header */}
      <div className="bg-garden-950 text-white py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/gallery"
            className="inline-flex items-center text-white/60 hover:text-white text-sm font-lato mb-6 transition-colors"
          >
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Tags
          </Link>
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-2">{label}</h1>
          <p className="text-white/60 font-lato">
            {photos.length} photo{photos.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {photos.length === 0 ? (
          <p className="text-gray-500">No photos tagged with &ldquo;{label}&rdquo; yet.</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo) => (
              <div key={photo.slug} className="break-inside-avoid">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-garden-100">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full object-cover"
                  />
                  {photo.title && (
                    <div className="px-3 py-2">
                      <p className="text-sm text-gray-600 font-lato">{photo.title}</p>
                      {photo.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {photo.tags.map((t) => (
                            <Link
                              key={t}
                              href={`/gallery/${t}`}
                              className={`text-xs px-2 py-0.5 rounded-full font-lato transition-colors ${
                                t === tag
                                  ? 'bg-garden-700 text-white'
                                  : 'bg-garden-100 text-garden-700 hover:bg-garden-200'
                              }`}
                            >
                              {formatTagLabel(t)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other tags */}
        {allTags.length > 0 && (
          <div className="mt-14 pt-8 border-t border-garden-100">
            <h2 className="text-sm font-semibold text-gray-500 font-lato uppercase tracking-wider mb-4">Other Tags</h2>
            <div className="flex flex-wrap gap-2">
              {!isAll && (
                <Link
                  href="/gallery/all"
                  className="text-sm px-3 py-1.5 rounded-full bg-garden-100 text-garden-700 hover:bg-garden-200 font-lato transition-colors"
                >
                  All Photos
                </Link>
              )}
              {allTags
                .filter((t) => t !== tag)
                .map((t) => (
                  <Link
                    key={t}
                    href={`/gallery/${t}`}
                    className="text-sm px-3 py-1.5 rounded-full bg-garden-100 text-garden-700 hover:bg-garden-200 font-lato transition-colors"
                  >
                    {formatTagLabel(t)}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
