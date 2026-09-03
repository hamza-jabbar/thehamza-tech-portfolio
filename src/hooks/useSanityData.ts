import { useEffect, useState } from 'react';
import { sanityFetch } from '#lib/sanity';
import {
  backgroundQuery,
  portfolioQuery,
  resumeQuery,
  aboutMeQuery,
  photosQuery,
  skillsCategoriesQuery,
  skillsQuery,
  type SanityBackground,
  type SanityPortfolio,
  type SanityResume,
  type SanityAboutMe,
  type SanityPhoto,
  type SanitySkillsCategory,
  type SanitySkill,
} from '#lib/queries';

export interface SanityData {
  background: SanityBackground | null;
  portfolio: SanityPortfolio[];
  resume: SanityResume | null;
  aboutMe: SanityAboutMe | null;
  photos: SanityPhoto[];
  skillsCategories: SanitySkillsCategory[];
  skills: SanitySkill[];
}

interface UseSanityDataReturn {
  data: SanityData;
  loading: boolean;
  error: Error | null;
}

const EMPTY: SanityData = {
  background: null,
  portfolio: [],
  resume: null,
  aboutMe: null,
  photos: [],
  skillsCategories: [],
  skills: [],
};

let cachedData: SanityData | null = null;
let fetchPromise: Promise<SanityData> | null = null;

async function fetchSanityData(): Promise<SanityData> {
  const [
    background,
    portfolio,
    resume,
    aboutMe,
    photos,
    skillsCategories,
    skills,
  ] = await Promise.all([
    sanityFetch<SanityBackground | null>(backgroundQuery),
    sanityFetch<SanityPortfolio[]>(portfolioQuery),
    sanityFetch<SanityResume | null>(resumeQuery),
    sanityFetch<SanityAboutMe | null>(aboutMeQuery),
    sanityFetch<SanityPhoto[]>(photosQuery),
    sanityFetch<SanitySkillsCategory[]>(skillsCategoriesQuery),
    sanityFetch<SanitySkill[]>(skillsQuery),
  ]);

  const result: SanityData = { background, portfolio, resume, aboutMe, photos, skillsCategories, skills };
  cachedData = result;
  return result;
}

export function useSanityData(): UseSanityDataReturn {
  const [data, setData] = useState<SanityData>(cachedData ?? EMPTY);
  const [loading, setLoading] = useState(!cachedData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetchSanityData();
    }

    fetchPromise
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[Sanity] Failed to fetch data:', err);
          setError(err instanceof Error ? err : new Error(String(err)));
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
