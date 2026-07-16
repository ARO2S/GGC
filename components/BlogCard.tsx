import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  tags?: string[];
}

export default function BlogCard({ slug, title, date, excerpt, author, image, tags }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col group">
      {image && (
        <Link href={`/blog/${slug}`} className="block aspect-video bg-garden-200 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
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
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-garden-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-gray-700 leading-relaxed flex-1">
          {excerpt}
        </p>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs px-2 py-1 rounded-full bg-garden-100 text-garden-700 hover:bg-garden-200 transition-colors font-medium"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
        <Link href={`/blog/${slug}`} className="mt-4 text-garden-600 font-semibold hover:text-garden-700 flex items-center">
          Read More
          <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
