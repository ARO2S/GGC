import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
}

export default function BlogCard({ slug, title, date, excerpt, author, image }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col">
        {image && (
          <div className="aspect-video bg-garden-200 overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {author && (
              <>
                <span className="mx-2">•</span>
                <span>{author}</span>
              </>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-garden-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-700 leading-relaxed flex-1">
            {excerpt}
          </p>
          <div className="mt-4 text-garden-600 font-semibold group-hover:text-garden-700 flex items-center">
            Read More
            <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

