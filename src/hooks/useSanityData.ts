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

export function useSanityData(): UseSanityDataReturn {
  const [data, setData] = useState<SanityData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
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

        if (!cancelled) {
          setData({ background, portfolio, resume, aboutMe, photos, skillsCategories, skills });
        }
      } catch (err) {
        if (!cancelled) {
          console.error('[Sanity] Failed to fetch data:', err);
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchAll();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
