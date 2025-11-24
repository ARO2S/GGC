import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

interface BlogPostProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string) {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filePath = path.join(blogDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString(),
    author: data.author,
    image: data.image,
    contentHtml,
  };
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir);
  
  return files
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace('.md', ''),
    }));
}

export default async function BlogPost({ params }: BlogPostProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-white">
      {/* Header */}
      {post.image && (
        <div className="w-full h-96 bg-garden-200 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-garden-600 hover:text-garden-700 font-semibold inline-flex items-center mb-6"
          >
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center text-gray-600">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
            {post.author && (
              <>
                <span className="mx-2">•</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>
        </div>

        <div 
          className="prose prose-lg max-w-none prose-headings:text-garden-800 prose-a:text-garden-600 hover:prose-a:text-garden-700"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}

