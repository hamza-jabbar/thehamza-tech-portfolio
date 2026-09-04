import DesktopShell from "#components/DesktopShell";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    windowRoute: string[];
  }>;
}

const TITLE_MAP: Record<string, string> = {
  skills: "Skills & Tech Stack | Hamza's Portfolio",
  terminal: "Skills & Tech Stack | Hamza's Portfolio",
  work: "Work & Portfolio | Hamza's Portfolio",
  finder: "Work & Portfolio | Hamza's Portfolio",
  about: "About Hamza | Hamza's Portfolio",
  projects: "Projects & Blog | Hamza's Portfolio",
  blog: "Projects & Blog | Hamza's Portfolio",
  safari: "Projects & Blog | Hamza's Portfolio",
  contact: "Contact Card | Hamza's Portfolio",
  resume: "Resume / CV | Hamza's Portfolio",
  photos: "Photos & Gallery | Hamza's Portfolio",
  archive: "Archive | Hamza's Portfolio",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const primaryRoute = resolvedParams.windowRoute?.[0]?.toLowerCase() || "";
  const secondaryRoute = resolvedParams.windowRoute?.[1];

  let title = TITLE_MAP[primaryRoute] || "Hamza's Portfolio";
  if ((primaryRoute === "work" || primaryRoute === "finder") && secondaryRoute) {
    const formattedProjectName = secondaryRoute
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    title = `${formattedProjectName} — Work | Hamza's Portfolio`;
  }

  return {
    title,
    description: `Interactive macOS & iOS view of ${title}`,
  };
}

export default function DynamicWindowPage() {
  return <DesktopShell />;
}
