"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { locations } from "#constants";

// Helper to convert project name to URL slug
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// Route mapping configuration
export const ROUTE_TO_WINDOW_MAP: Record<string, string> = {
  skills: "terminal",
  terminal: "terminal",
  projects: "safari",
  blog: "safari",
  safari: "safari",
  work: "finder",
  finder: "finder",
  about: "txtfile",
  txtfile: "txtfile",
  contact: "contact",
  resume: "resume",
  photos: "photos",
  gallery: "photos",
  archive: "finder",
  trash: "finder",
};

export const WINDOW_TO_ROUTE_MAP: Record<string, string> = {
  terminal: "/skills",
  safari: "/projects",
  finder: "/work",
  txtfile: "/about",
  contact: "/contact",
  resume: "/resume",
  photos: "/photos",
  imgfile: "/photos",
};

export function useWindowRouteSync() {
  const pathname = usePathname();
  const router = useRouter();
  const { windows, activeWindowKey, openWindow, closeWindow, focusWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  
  // Guard to prevent circular sync loops
  const isNavigatingRef = useRef(false);

  // ─── 1. Synchronize URL -> Window State (Direct links, Back/Forward button) ───
  useEffect(() => {
    if (!pathname) return;

    const segments = pathname.replace(/^\/+|\/+$/g, "").split("/");
    const primaryRoute = segments[0] || "";
    const secondaryParam = segments[1] || "";

    if (!primaryRoute) {
      // Root route "/" - if a window is open and we navigated here via Back button, sync state
      if (!isNavigatingRef.current && activeWindowKey) {
        // Keep active in sync
      }
      return;
    }

    const targetWindowKey = ROUTE_TO_WINDOW_MAP[primaryRoute.toLowerCase()];
    if (!targetWindowKey) return;

    isNavigatingRef.current = true;

    // Special location handling for Finder / Archive / Projects
    if (primaryRoute === "archive" || primaryRoute === "trash") {
      setActiveLocation(locations.trash);
      openWindow("finder");
    } else if (targetWindowKey === "finder") {
      if (secondaryParam) {
        // Attempt to find project by slug
        const matchingProject = locations.work?.children?.find(
          (p) => slugify(p.name) === secondaryParam || String(p.id) === secondaryParam
        );
        if (matchingProject) {
          setActiveLocation(matchingProject);
        } else {
          setActiveLocation(locations.work);
        }
      } else {
        setActiveLocation(locations.work);
      }
      openWindow("finder");
    } else if (targetWindowKey === "txtfile") {
      const aboutData = locations.about.children?.find((c) => c.fileType === "txt");
      openWindow("txtfile", aboutData);
    } else {
      openWindow(targetWindowKey);
    }

    focusWindow(targetWindowKey);

    const timer = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, openWindow, focusWindow, setActiveLocation]);

  // ─── 2. Synchronize Window State -> URL (When user clicks/focuses a window) ───
  useEffect(() => {
    if (isNavigatingRef.current) return;

    if (!activeWindowKey) {
      if (pathname !== "/") {
        window.history.replaceState(null, "", "/");
      }
      return;
    }

    let targetUrl = WINDOW_TO_ROUTE_MAP[activeWindowKey] || "/";

    if (activeWindowKey === "finder" && activeLocation) {
      if (activeLocation.id === locations.trash.id) {
        targetUrl = "/archive";
      } else if (activeLocation.id !== locations.work.id && activeLocation.name) {
        targetUrl = `/work/${slugify(activeLocation.name)}`;
      }
    }

    if (pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
  }, [activeWindowKey, activeLocation, pathname]);

  // ─── 3. Helper to open window with route push ──────────────────────────────
  const navigateToWindow = useCallback(
    (windowKey: string, data?: any) => {
      let targetUrl = WINDOW_TO_ROUTE_MAP[windowKey] || `/${windowKey}`;
      
      if (windowKey === "finder" && data?.name) {
        targetUrl = `/work/${slugify(data.name)}`;
      }

      openWindow(windowKey, data);
      focusWindow(windowKey);
      
      if (window.location.pathname !== targetUrl) {
        router.push(targetUrl, { scroll: false });
      }
    },
    [openWindow, focusWindow, router]
  );

  const navigateCloseWindow = useCallback(
    (windowKey: string) => {
      closeWindow(windowKey);
      
      // Determine what URL should be next
      const remainingOpen = Object.entries(windows).filter(
        ([k, w]) => k !== windowKey && w.isOpen
      );

      if (remainingOpen.length === 0) {
        router.push("/", { scroll: false });
      } else {
        // Find highest z-index
        remainingOpen.sort((a, b) => b[1].zIndex - a[1].zIndex);
        const topKey = remainingOpen[0][0];
        const nextUrl = WINDOW_TO_ROUTE_MAP[topKey] || "/";
        router.push(nextUrl, { scroll: false });
      }
    },
    [closeWindow, windows, router]
  );

  return {
    navigateToWindow,
    navigateCloseWindow,
  };
}

export default useWindowRouteSync;
