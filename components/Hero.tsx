import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showLogo?: boolean;
}

export default function Hero({ title, subtitle, backgroundImage, showLogo }: HeroProps) {
  return (
    <div 
      className="relative bg-garden-700 text-white py-20 px-4 sm:py-32"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(21, 128, 61, 0.7), rgba(21, 128, 61, 0.7)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      <div className="max-w-7xl mx-auto text-center">
        {showLogo && (
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo.png"
              alt="Greenville Garden Club Logo"
              width={160}
              height={160}
              className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain drop-shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl sm:text-2xl text-garden-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

