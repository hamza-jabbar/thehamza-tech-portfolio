// ─── TypeScript types matching the Sanity schema ─────────────────────────────

export interface SanityImageAsset {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
}

export interface SanityFileAsset {
  _type: 'file';
  asset: { _ref: string; _type: 'reference'; url?: string };
}

export interface SanitySkillsCategory {
  _id: string;
  title: string;
  body?: string;
}

export interface SanitySkill {
  _id: string;
  title: string;
  subtitle?: string;
  category: { _id: string; title: string };
  portfolio?: Array<{ _id: string; title: string }>;
}

export interface SanityProjectFile {
  _key: string;
  name: string;
  fileType?: 'img' | 'pdf' | 'url' | 'fig' | 'txt';
  href?: string;
  asset?: SanityImageAsset;
  assetUrl?: string;       // resolved by GROQ
  position?: string;
  description?: string[];
}

export interface SanityPortfolio {
  _id: string;
  title: string;
  position?: string;
  files: SanityProjectFile[];
  skills?: Array<{ _id: string; title: string }>;
}

export interface SanityResume {
  _id: string;
  title: string;
  body?: unknown[];
  fileUrl?: string; // resolved by GROQ
}

export interface SanityAboutMe {
  _id: string;
  title: string;
  subtitle?: string;
  image?: SanityImageAsset;
  mobile?: string;
  email?: string;
  links?: Array<{
    _key: string;
    label: string;
    url: string;
    icon?: SanityImageAsset;
    bg?: string;
  }>;
}

export interface SanityPhoto {
  _id: string;
  image: SanityImageAsset;
  alt: string;
  caption?: string;
  category?: { _id: string; title: string };
}

export interface SanityBackground {
  _id: string;
  title?: string;
  desktopImage?: SanityImageAsset;
  mobileImage?: SanityImageAsset;
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

export const backgroundQuery = /* groq */ `
  *[_type == "background"][0] {
    _id,
    title,
    desktopImage,
    mobileImage
  }
`;

export const portfolioQuery = /* groq */ `
  *[_type == "portfolio"] | order(_createdAt asc) {
    _id,
    title,
    position,
    files[] {
      _key,
      name,
      fileType,
      href,
      asset,
      "assetUrl": asset.asset->url,
      position,
      description
    },
    "skills": skills[]->{ _id, title }
  }
`;

export const resumeQuery = /* groq */ `
  *[_type == "resume"][0] {
    _id,
    title,
    body,
    "fileUrl": file.asset->url
  }
`;

export const aboutMeQuery = /* groq */ `
  *[_type == "aboutMe"][0] {
    _id,
    title,
    subtitle,
    image,
    mobile,
    email,
    links[] {
      _key,
      label,
      url,
      icon,
      bg
    }
  }
`;

export const photosQuery = /* groq */ `
  *[_type == "photo"] | order(_createdAt asc) {
    _id,
    image,
    alt,
    caption,
    "category": category->{ _id, title }
  }
`;

export const skillsCategoriesQuery = /* groq */ `
  *[_type == "skillsCategory"] | order(_createdAt asc) {
    _id,
    title,
    body
  }
`;

export const skillsQuery = /* groq */ `
  *[_type == "skill"] | order(_createdAt asc) {
    _id,
    title,
    subtitle,
    "category": category->{ _id, title },
    "portfolio": portfolio[]->{ _id, title }
  }
`;
