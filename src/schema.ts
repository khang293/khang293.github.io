// Dữ liệu có cấu trúc (JSON-LD) giúp Google hiểu web. Người xem không thấy phần này.
import { SITE } from './config';
import { lp, type Lang } from './i18n';

const abs = (path: string) => new URL(path, SITE.url).href;
const PERSON_ID = `${SITE.url}/#person`;

export function personSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.author,
    jobTitle: SITE.text[lang].role,
    description: SITE.text[lang].description,
    url: abs(lp(lang, '/')),
    ...(SITE.email ? { email: SITE.email } : {}),
    knowsAbout: [...SITE.stack, ...SITE.stackSecondary],
    sameAs: [SITE.github, SITE.linkedin].filter(Boolean),
  };
}

export function websiteSchema(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.brand,
    url: abs(lp(lang, '/')),
    inLanguage: lang === 'vi' ? 'vi-VN' : 'en-US',
    publisher: { '@id': PERSON_ID },
  };
}

export function professionalServiceSchema(lang: Lang, services: { title: string; summary: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.brand,
    url: abs(lp(lang, '/')),
    description: SITE.text[lang].description,
    provider: { '@id': PERSON_ID },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'vi' ? 'Dịch vụ' : 'Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.summary },
      })),
    },
  };
}

export function serviceSchema(lang: Lang, s: { title: string; summary: string }, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.title,
    description: s.summary,
    url: abs(path),
    provider: { '@id': PERSON_ID },
  };
}

export function blogPostSchema(lang: Lang, p: { title: string; description: string; date: Date }, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date.toISOString().slice(0, 10),
    inLanguage: lang === 'vi' ? 'vi-VN' : 'en-US',
    url: abs(path),
    mainEntityOfPage: abs(path),
    image: abs('/og-image.png'),
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
