import { NextResponse, type NextRequest } from 'next/server';
import { sanityClient } from '#lib/sanity';
import {
  SITE_SETTINGS_QUERY,
  PERSON_QUERY,
  PROJECTS_QUERY,
  FEATURED_PROJECTS_QUERY,
  SERVICES_QUERY,
  ARTICLES_QUERY,
  EXPERIMENTS_QUERY,
  NOW_QUERY,
  EXPERIENCES_QUERY,
  TECHNOLOGIES_QUERY,
} from '#lib/sanity-queries';

// Whitelist of allowed queries
const ALLOWED_QUERIES: Record<string, string> = {
  siteSettings: SITE_SETTINGS_QUERY,
  person: PERSON_QUERY,
  projects: PROJECTS_QUERY,
  featuredProjects: FEATURED_PROJECTS_QUERY,
  services: SERVICES_QUERY,
  articles: ARTICLES_QUERY,
  experiments: EXPERIMENTS_QUERY,
  now: NOW_QUERY,
  experiences: EXPERIENCES_QUERY,
  technologies: TECHNOLOGIES_QUERY,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!type || !ALLOWED_QUERIES[type]) {
    return NextResponse.json(
      {
        error: `Invalid or missing query type. Allowed: ${Object.keys(ALLOWED_QUERIES).join(', ')}`,
      },
      { status: 400 }
    );
  }

  try {
    const data = await sanityClient.fetch(ALLOWED_QUERIES[type]);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error(`[API /api/sanity] Query error for type="${type}":`, error);
    return NextResponse.json({ error: 'Failed to fetch Sanity data' }, { status: 500 });
  }
}
