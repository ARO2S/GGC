import { Suspense } from 'react';
import Hero from '@/components/Hero';
import BlogFilter from '@/components/BlogFilter';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog');

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  return files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(blogDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: filename.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        excerpt: data.excerpt || content.substring(0, 150) + '...',
        author: data.author,
        image: data.image,
        tags: (data.tags as string[]) || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function Blog() {
  const posts = getBlogPosts();
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags))).sort();

  return (
    <>
      <Hero
        title="Blog & Articles"
        subtitle="Gardening tips, club updates, and stories from our members"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <div key={post.slug} className="bg-white rounded-lg shadow-lg h-64 animate-pulse" />
            ))}
          </div>
        }>
          <BlogFilter posts={posts} allTags={allTags} />
        </Suspense>
      </div>
    </>
  );
}
