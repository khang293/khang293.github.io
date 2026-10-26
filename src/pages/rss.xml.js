import rss from '@astrojs/rss';
import { SITE } from '../config';
import { getPosts } from '../lib';

export async function GET(context) {
  const posts = await getPosts('vi');
  return rss({
    title: SITE.brand,
    description: SITE.text.vi.description,
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.description,
      link: `/posts/${p.id}/`,
    })),
  });
}
