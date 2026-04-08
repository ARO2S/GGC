import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showLogo?: boolean;
}

export default function Hero({ title, subtitle, backgroundImage, showLogo }: HeroProps) {
  const bgStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(5, 46, 22, 0.82), rgba(5, 46, 22, 0.82)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  if (showLogo) {
    return (
      <div
        className="relative bg-garden-950 text-white"
        style={bgStyle}
      >
        {/* Decorative accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-garden-400 via-garden-300 to-garden-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Logo — left half */}
            <div className="flex-shrink-0 flex justify-center md:w-2/5">
              <div className="relative">
                {/* Soft glow ring */}
                <div className="absolute inset-0 rounded-full bg-garden-500/20 blur-2xl scale-110" />
                <Image
                  src="/images/logo.png"
                  alt="Greenville Garden Club Logo"
                  width={320}
                  height={320}
                  className="relative h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Text — right half */}
            <div className="md:w-3/5 text-center md:text-left">
              <p className="uppercase tracking-widest text-garden-300 text-sm font-semibold mb-3">
                Greenville, Illinois
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg sm:text-xl text-garden-200 leading-relaxed max-w-xl">
                  {subtitle}
                </p>
              )}
              <div className="mt-6 h-1 w-16 bg-garden-400 rounded-full md:mx-0 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard centered hero for inner pages
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
