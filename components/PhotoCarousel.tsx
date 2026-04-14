'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Photo {
  src: string;
  alt: string;
}

interface PhotoCarouselProps {
  photos: Photo[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 4500);
  }, [photos.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (photos.length > 1) startAutoPlay();
    return stopAutoPlay;
  }, [photos.length, startAutoPlay, stopAutoPlay]);

  const goTo = (index: number) => {
    stopAutoPlay();
    setCurrent(index);
    startAutoPlay();
  };

  const prev = () => goTo((current - 1 + photos.length) % photos.length);
  const next = () => goTo((current + 1) % photos.length);

  if (photos.length === 0) return null;

  return (
    <>
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-garden-800 mb-8 text-center">Our Garden Gallery</h2>

        <div
          className="relative overflow-hidden rounded-xl shadow-lg bg-black mx-auto"
          style={{ aspectRatio: '16/9', maxHeight: '520px' }}
          onMouseEnter={stopAutoPlay}
          onMouseLeave={startAutoPlay}
        >
          {/* Slides */}
          {photos.map((photo, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: index === current ? 1 : 0, pointerEvents: index === current ? 'auto' : 'none' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover cursor-pointer"
                sizes="(max-width: 768px) 100vw, 80vw"
                onClick={() => setLightboxPhoto(photo)}
                priority={index === 0}
              />
            </div>
          ))}

          {/* Gradient overlays for controls */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/30 to-transparent pointer-events-none" />

          {/* Prev / Next buttons */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
                aria-label="Previous photo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
                aria-label="Next photo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Counter badge */}
          <div className="absolute top-3 right-3 bg-black/50 text-white text-sm px-3 py-1 rounded-full z-10">
            {current + 1} / {photos.length}
          </div>

          {/* Click hint */}
          <div className="absolute bottom-12 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded z-10">
            Click to enlarge
          </div>
        </div>

        {/* Dot indicators */}
        {photos.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-garden-600 w-6 h-3'
                    : 'bg-garden-300 hover:bg-garden-400 w-3 h-3'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 snap-x">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`flex-none w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 snap-start ${
                index === current ? 'border-garden-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
              aria-label={`View ${photo.alt}`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setLightboxPhoto(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image
              src={lightboxPhoto.src}
              alt={lightboxPhoto.alt}
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
