"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { sanityFetch } from "#lib/sanity";

interface UseSanityQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useSanityQuery<T>(
  query: string,
  params?: Record<string, unknown>,
  initialData: T | null = null
): UseSanityQueryResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [loading, setLoading] = useState<boolean>(!initialData);
  const [error, setError] = useState<Error | null>(null);

  const paramsKey = JSON.stringify(params ?? {});
  const isMountedRef = useRef(true);

  const executeFetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await sanityFetch<T>(query, params);
      if (isMountedRef.current) {
        setData(res);
        setError(null);
      }
    } catch (err) {
      if (isMountedRef.current) {
        console.error("[useSanityQuery] Fetch failed:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [query, paramsKey]);

  useEffect(() => {
    isMountedRef.current = true;
    executeFetch();

    return () => {
      isMountedRef.current = false;
    };
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
}
