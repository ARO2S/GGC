import Hero from '@/components/Hero';
import BlogCard from '@/components/BlogCard';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Get blog posts from content directory
function getBlogPosts() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  
  // Check if directory exists
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  const posts = files
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <>
      <Hero 
        title="Blog & Articles"
        subtitle="Gardening tips, club updates, and stories from our members"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <svg className="h-16 w-16 text-garden-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Yet</h3>
            <p className="text-gray-600 mb-6">
              Blog posts will appear here once they're added through the CMS.
            </p>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-md mx-auto">
              <p className="text-sm text-blue-800">
                <strong>For Club Officers:</strong> Log in at <span className="font-mono">/admin</span> to 
                create your first blog post.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

