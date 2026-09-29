import type { SanityPortfolio, SanityProjectFile } from '#lib/queries';
import type { SanityProject } from '#types/sanity';
import { projectImage } from '#lib/imageUrl';

export interface FinderItem {
  id: string | number;
  name: string;
  icon: string;
  fileType?: string;
  kind?: string;
  href?: string;
  position?: string;
  subtitle?: string;
  description?: string[];
  imageUrl?: string;
  children?: FinderItem[];
  [key: string]: unknown;
}

const DEFAULT_PROJECT_POSITIONS = [
  'top-10 left-5',
  'top-52 right-80',
  'top-10 left-80',
  'top-10 right-5',
  'top-52 left-5',
];

const FILE_POSITIONS = [
  'top-5 left-10',
  'top-10 right-20',
  'top-52 right-80',
  'top-60 right-20',
  'top-32 left-40',
];

const FILE_ICON_MAP: Record<string, string> = {
  txt: '/images/txt.png',
  url: '/images/safari.png',
  pdf: '/images/pdf.png',
  fig: '/images/plain.png',
  img: '/images/image.png',
};

export function sanityProjectToFinderItem(
  project: SanityPortfolio,
  index: number
): FinderItem {
  const children: FinderItem[] = (project.files ?? []).map(
    (file: SanityProjectFile, fi: number) => ({
      id: file._key ?? fi,
      name: file.name ?? 'Untitled',
      icon: FILE_ICON_MAP[file.fileType ?? 'txt'] ?? '/images/txt.png',
      kind: 'file',
      fileType: file.fileType ?? 'txt',
      href: file.href,
      position: file.position ?? FILE_POSITIONS[fi % FILE_POSITIONS.length],
      description: file.description,
      imageUrl:
        file.asset && file.assetUrl ? projectImage(file.asset) : undefined,
    })
  );

  return {
    id: project._id,
    name: project.title,
    icon: '/images/folder.png',
    kind: 'folder',
    position:
      project.position ?? DEFAULT_PROJECT_POSITIONS[index % DEFAULT_PROJECT_POSITIONS.length],
    children,
  };
}

export function sanityDocumentProjectToFinderItem(
  proj: SanityProject,
  index: number
): FinderItem {
  const children: FinderItem[] = [];

  // Description / Info text file
  const descriptionLines: string[] = [];
  if (proj.summary) descriptionLines.push(proj.summary);
  if (proj.problem) descriptionLines.push(`Problem: ${proj.problem}`);
  if (proj.outcome) descriptionLines.push(`Outcome: ${proj.outcome}`);

  children.push({
    id: `${proj._id}-readme`,
    name: 'README.txt',
    icon: FILE_ICON_MAP.txt,
    kind: 'file',
    fileType: 'txt',
    position: FILE_POSITIONS[0],
    description: descriptionLines.length > 0 ? descriptionLines : [proj.title],
  });

  // Hero image if present
  if (proj.heroImage) {
    children.push({
      id: `${proj._id}-hero`,
      name: 'cover.png',
      icon: FILE_ICON_MAP.img,
      kind: 'file',
      fileType: 'img',
      position: FILE_POSITIONS[1 % FILE_POSITIONS.length],
      imageUrl: projectImage(proj.heroImage),
    });
  }

  // External links
  (proj.externalLinks ?? []).forEach((link, li) => {
    children.push({
      id: `${proj._id}-link-${li}`,
      name: `${link.label || 'Link'}.url`,
      icon: FILE_ICON_MAP.url,
      kind: 'file',
      fileType: 'url',
      href: link.url,
      position: FILE_POSITIONS[(li + 2) % FILE_POSITIONS.length],
    });
  });

  return {
    id: proj._id,
    name: proj.title,
    icon: '/images/folder.png',
    kind: 'folder',
    position:
      DEFAULT_PROJECT_POSITIONS[index % DEFAULT_PROJECT_POSITIONS.length],
    children,
  };
}
