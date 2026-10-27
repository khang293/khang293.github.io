import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://khang293.github.io',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'vi', locales: { vi: 'vi-VN', en: 'en-US' } },
      // Trang nguồn để in PDF không cần xuất hiện trên Google
      filter: (page) => !/\/profile\/?$/.test(page),
    }),
  ],
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
});
