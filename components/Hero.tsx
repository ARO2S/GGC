interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function Hero({ title, subtitle, backgroundImage }: HeroProps) {
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

