'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Photo {
  src: string;
  alt: string;
}

const VISIBLE = 3;
const INTERVAL = 4000;

export default function HomePhotoStrip({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const max = photos.length - VISIBLE;

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    if (photos.length <= VISIBLE) return;
    stopTimer();
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev >= max ? 0 : prev + 1));
    }, INTERVAL);
  }, [photos.length, max, stopTimer]);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  const go = (next: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setIndex(Math.max(0, Math.min(next, max)));
    startTimer();
    setTimeout(() => setTransitioning(false), 400);
  };

  if (photos.length === 0) return null;

  const pct = (index / photos.length) * 100;

  return (
    <div
      className="relative overflow-hidden h-64 sm:h-80 bg-garden-900"
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      {/* Sliding track */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ width: `${(photos.length / VISIBLE) * 100}%`, transform: `translateX(-${pct}%)` }}
      >
        {photos.map((photo, i) => (
          <div
            key={photo.src}
            className="relative h-full"
            style={{ width: `${(VISIBLE / photos.length) * 100}%` }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="33vw"
              priority={i < VISIBLE}
            />
          </div>
        ))}
      </div>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next */}
      {index < max && (
        <button
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/65 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
