import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface GalleryPhoto {
  title: string;
  image: string;
  order: number;
  tags: string[];
  slug: string;
}

export function getAllPhotos(): GalleryPhoto[] {
  const dir = path.join(process.cwd(), 'content/gallery');
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const { data } = matter(fs.readFileSync(path.join(dir, filename), 'utf8'));
      return {
        title: data.title || '',
        image: data.image || '',
        order: typeof data.order === 'number' ? data.order : 99,
        tags: Array.isArray(data.tags) ? data.tags : [],
        slug: filename.replace('.md', ''),
      };
    })
    .sort((a, b) => a.order - b.order);
}

export function getPhotosByTag(tag: string): GalleryPhoto[] {
  return getAllPhotos().filter((p) => p.tags.includes(tag));
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllPhotos().forEach((p) => p.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function formatTagLabel(tag: string): string {
  const parts = tag.split('-');
  const yearIndex = parts.findIndex((p) => /^\d{4}$/.test(p));
  if (yearIndex !== -1) {
    const year = parts[yearIndex];
    const words = [...parts.slice(0, yearIndex), ...parts.slice(yearIndex + 1)];
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') + ' · ' + year;
  }
  return parts.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
