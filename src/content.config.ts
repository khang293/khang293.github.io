import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lang = z.enum(['vi', 'en']);

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
    lang: lang.default('vi'),
    draft: z.boolean().default(false),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Mỗi dịch vụ có 2 file cùng tên: services/vi/<slug>.md và services/en/<slug>.md
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    lang,
    title: z.string(),
    summary: z.string(),
    icon: z.string().default('🧩'),
    order: z.number().default(10),
    features: z.array(z.string()).default([]),
    price: z.string().optional(),
  }),
});

// Mỗi dự án có 2 file cùng tên: projects/vi/<slug>.md và projects/en/<slug>.md
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    lang,
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date().optional(), // có thể bỏ trống, khi đó trang không hiện ngày
    icon: z.string().default('🚀'),
    order: z.number().default(50), // số nhỏ hiện trước; cùng số thì mới nhất lên trên
    tags: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    role: z.string().optional(),
    results: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    sample: z.boolean().default(false),
  }),
});

export const collections = { posts, journal, services, projects };
