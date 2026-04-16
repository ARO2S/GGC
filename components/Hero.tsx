import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showLogo?: boolean;
}

export default function Hero({ title, subtitle, backgroundImage, showLogo }: HeroProps) {

  if (showLogo) {
    const bgStyle = backgroundImage
      ? {
          backgroundImage: `linear-gradient(to bottom, rgba(5,20,10,0.35) 0%, rgba(5,20,10,0.78) 100%), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {
          background: 'linear-gradient(to bottom, #052e16, #14532d)',
        };

    return (
      <div
        className="relative flex flex-col justify-end min-h-[520px] lg:min-h-[640px] text-white"
        style={bgStyle}
      >
        <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-12 sm:pb-16">

          {/* Logo + headline lockup */}
          <div className="flex items-end gap-5 mb-5">
            <div className="w-24 h-24 rounded-full bg-white overflow-hidden shadow-2xl ring-2 ring-white/25 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Greenville Garden Club"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <p className="font-lato text-xs sm:text-sm uppercase tracking-[0.22em] text-white/60 mb-1">
                Established 1939 · Greenville, Illinois
              </p>
              <h1 className="font-playfair italic text-5xl sm:text-6xl lg:text-7xl text-white leading-none">
                {title}
              </h1>
            </div>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <p className="font-lato text-base sm:text-lg text-white/70 max-w-md mb-6 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* CTAs */}
          <div className="flex items-center gap-6">
            <a
              href="/join"
              className="px-6 py-3 bg-white rounded-full font-lato font-bold text-sm text-garden-900 hover:bg-garden-50 transition-colors"
            >
              Join the Club
            </a>
            <a
              href="/programs-2026"
              className="font-lato text-sm text-white/70 border-b border-white/40 pb-px hover:text-white hover:border-white transition-colors"
            >
              View 2026 Programs →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Standard centered hero for inner pages — unchanged ──
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(5, 46, 22, 0.82), rgba(5, 46, 22, 0.82)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  return (
    <div
      className="relative bg-garden-900 text-white py-16 px-4 sm:py-24"
      style={bgStyle}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-garden-400 via-garden-300 to-garden-500" />
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-garden-100 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
