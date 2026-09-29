import type { SanityPerson, SanityProject, SanityArticle, SanitySiteSettings } from '#types/sanity';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://thehamza.tech';

export function getCanonicalUrl(path = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;
}

export function buildPersonJsonLd(person?: Partial<SanityPerson> | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person?.name || 'Hamza Jabbar',
    url: SITE_URL,
    jobTitle: person?.role || 'Software Developer',
    description: person?.shortBio || person?.headline || 'Software Developer specializing in Full Stack and Mobile development.',
    sameAs: person?.socialProfiles?.map((p) => p.url).filter(Boolean) || [
      'https://github.com/hamza-jabbar',
      'https://linkedin.com/in/hamzajabbar',
    ],
  };
}

export function buildWebsiteJsonLd(siteSettings?: Partial<SanitySiteSettings> | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteSettings?.title || "Hamza's Portfolio",
    url: SITE_URL,
    description: siteSettings?.description || 'Interactive macOS & iOS styled portfolio of Hamza Jabbar.',
    author: {
      '@type': 'Person',
      name: 'Hamza Jabbar',
    },
  };
}

export function buildArticleJsonLd(article: Partial<SanityArticle>, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}${url}`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Hamza Jabbar',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Hamza Jabbar',
    },
  };
}

export function buildProjectJsonLd(project: Partial<SanityProject>, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.summary,
    applicationCategory: project.projectType || 'WebApplication',
    operatingSystem: 'Any',
    url: `${SITE_URL}${url}`,
    author: {
      '@type': 'Person',
      name: 'Hamza Jabbar',
    },
  };
}
