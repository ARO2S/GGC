'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Photo {
  src: string;
  alt: string;
}

const photos: Photo[] = [
  { src: '/images/uploads/20251113_023436000_iOS.png', alt: 'Garden view 1' },
  { src: '/images/uploads/20251113_023758000_iOS.jpg', alt: 'Garden view 2' },
  { src: '/images/uploads/20251113_032455270_iOS.jpg', alt: 'Garden flowers' },
  { src: '/images/uploads/20251113_032704211_iOS.jpg', alt: 'Garden landscape' },
  { src: '/images/uploads/20251113_032828000_iOS.jpg', alt: 'Beautiful blooms' },
  { src: '/images/uploads/20251113_032839000_iOS.jpg', alt: 'Garden details' },
  { src: '/images/uploads/20251113_033003000_iOS.jpg', alt: 'Plant life' },
  { src: '/images/uploads/20251113_033055962_iOS.jpg', alt: 'Garden scenery' },
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <>
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-garden-800 mb-8 text-center">Our Garden Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

