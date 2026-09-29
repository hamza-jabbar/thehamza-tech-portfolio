import type { MetadataRoute } from 'next';
import { sanityClient } from '#lib/sanity';
import { SITE_URL } from '#lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/skills`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/resume`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/photos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/thinking`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/lab`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/now`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ];

  try {
    const [articles, projects, services] = await Promise.all([
      sanityClient.fetch<Array<{ slug: { current: string }; updatedAt?: string; publishedAt?: string }>>(
        `*[_type == "article" && defined(slug.current)] { slug, updatedAt, publishedAt }`
      ),
      sanityClient.fetch<Array<{ slug: { current: string }; publishedAt?: string }>>(
        `*[_type == "project" && defined(slug.current)] { slug, publishedAt }`
      ),
      sanityClient.fetch<Array<{ slug: { current: string } }>>(
        `*[_type == "service" && defined(slug.current)] { slug }`
      ),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = (articles || []).map((art) => ({
      url: `${SITE_URL}/thinking/${art.slug.current}`,
      lastModified: art.updatedAt ? new Date(art.updatedAt) : art.publishedAt ? new Date(art.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const projectRoutes: MetadataRoute.Sitemap = (projects || []).map((proj) => ({
      url: `${SITE_URL}/work/${proj.slug.current}`,
      lastModified: proj.publishedAt ? new Date(proj.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    const serviceRoutes: MetadataRoute.Sitemap = (services || []).map((srv) => ({
      url: `${SITE_URL}/services/${srv.slug.current}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...serviceRoutes];
  } catch (err) {
    console.warn('[sitemap] Failed to fetch dynamic routes from Sanity, falling back to static routes:', err);
    return staticRoutes;
  }
}
