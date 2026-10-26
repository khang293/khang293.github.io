import { getCollection } from 'astro:content';
import type { Lang } from './i18n';

const visible = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

export const slugOf = (id: string) => id.split('/').pop()!;

export async function getPosts(lang: Lang = 'vi') {
  return (await getCollection('posts', (e) => visible(e) && e.data.lang === lang)).sort((a, b) => +b.data.date - +a.data.date);
}

export async function getJournal() {
  return (await getCollection('journal', visible)).sort((a, b) => +b.data.date - +a.data.date);
}

export async function getServices(lang: Lang) {
  return (await getCollection('services', (e) => e.data.lang === lang)).sort((a, b) => a.data.order - b.data.order);
}

export async function getProjects(lang: Lang) {
  // Theo `order` (nhỏ lên trước), dự án mẫu luôn xuống cuối, cùng nhóm thì mới nhất lên trên
  return (await getCollection('projects', (e) => e.data.lang === lang)).sort(
    (a, b) =>
      Number(a.data.sample) - Number(b.data.sample) ||
      a.data.order - b.data.order ||
      (+(b.data.date ?? 0)) - (+(a.data.date ?? 0)),
  );
}

export const fmtDate = (d: Date, locale = 'vi-VN') =>
  d.toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });

export const readingTime = (text = '') => Math.max(1, Math.round(text.split(/\s+/).length / 200));

export const tagSlug = (t: string) =>
  t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// Tags chỉ áp dụng cho nội dung tiếng Việt (bài viết vi + nhật ký)
export async function getTags() {
  const all = [...(await getPosts('vi')), ...(await getJournal())];
  const map = new Map<string, { name: string; count: number }>();
  for (const e of all) for (const t of e.data.tags) {
    const s = tagSlug(t);
    map.set(s, { name: map.get(s)?.name ?? t, count: (map.get(s)?.count ?? 0) + 1 });
  }
  return map;
}
