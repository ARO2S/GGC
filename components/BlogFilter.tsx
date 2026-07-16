'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  image?: string;
  tags: string[];
}

interface BlogFilterProps {
  posts: Post[];
  allTags: string[];
}

export default function BlogFilter({ posts, allTags }: BlogFilterProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag');

  const filtered = activeTag
    ? posts.filter(p => p.tags.includes(activeTag))
    : posts;

  return (
    <div>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !activeTag
                ? 'bg-garden-600 text-white'
                : 'bg-garden-100 text-garden-700 hover:bg-garden-200'
            }`}
          >
            All Posts
          </Link>
          {allTags.map(tag => (
            <Link
              key={tag}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTag === tag
                  ? 'bg-garden-600 text-white'
                  : 'bg-garden-100 text-garden-700 hover:bg-garden-200'
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(post => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-gray-600 mb-4">No posts found for this tag.</p>
          <Link href="/blog" className="text-garden-600 font-semibold hover:text-garden-700">
            ← Back to all posts
          </Link>
        </div>
      )}
    </div>
  );
}
