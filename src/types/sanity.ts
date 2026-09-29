// ─── Manual Sanity Content Schema Types ─────────────────────────────────────

export interface SanityImageAsset {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string;
  };
}

export interface SanityFileAsset {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string;
  };
}

export interface SanityReference {
  _ref: string;
  _type: 'reference';
}

export interface SanitySeo {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageAsset;
  keywords?: string[];
}

export interface SanitySocialProfile {
  platform: string;
  url: string;
  handle?: string;
  icon?: SanityImageAsset;
}

export interface SanityExternalLink {
  label: string;
  url: string;
  type: 'demo' | 'repo' | 'figma' | 'article' | 'other';
}

export interface SanitySource {
  title: string;
  url?: string;
  author?: string;
  publishedAt?: string;
}

export interface SanitySiteSettings {
  _id: string;
  _type: 'siteSettings';
  title: string;
  description?: string;
  logo?: SanityImageAsset;
  contactEmail?: string;
  socialProfiles?: SanitySocialProfile[];
  seo?: SanitySeo;
}

export interface SanityOrganisation {
  _id: string;
  _type: 'organisation';
  name: string;
  slug?: { current: string };
  logo?: SanityImageAsset;
  website?: string;
  industry?: string;
  description?: string;
}

export interface SanityTechnology {
  _id: string;
  _type: 'technology';
  name: string;
  slug?: { current: string };
  icon?: SanityImageAsset;
  category?: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'tools';
  proficiency?: number;
  website?: string;
  featured?: boolean;
}

export interface SanityTestimonial {
  _id: string;
  _type: 'testimonial';
  quote: string;
  author: string;
  role?: string;
  organisation?: SanityOrganisation;
  companyName?: string;
  avatar?: SanityImageAsset;
  linkedInUrl?: string;
}

export interface SanityExperience {
  _id: string;
  _type: 'experience';
  role: string;
  organisation?: SanityOrganisation;
  companyName?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  summary?: string;
  responsibilities?: string[];
  technologies?: SanityTechnology[];
}

export interface SanityEducation {
  _id: string;
  _type: 'education';
  institution: string;
  degree?: string;
  field?: string;
  startYear?: string;
  endYear?: string;
  description?: string;
}

export interface SanityCertification {
  _id: string;
  _type: 'certification';
  title: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialUrl?: string;
  logo?: SanityImageAsset;
}

export interface SanityProject {
  _id: string;
  _type: 'project';
  title: string;
  slug: { current: string };
  client?: string;
  organisation?: SanityOrganisation;
  projectType?: string;
  industry?: string;
  status?: 'in-progress' | 'completed' | 'archived';
  featured?: boolean;
  summary?: string;
  heroImage?: SanityImageAsset;
  gallery?: SanityImageAsset[];
  problem?: string;
  objective?: string;
  strategy?: string;
  execution?: string;
  outcome?: string;
  services?: Array<{ _id: string; title: string }>;
  technologies?: SanityTechnology[];
  testimonial?: SanityTestimonial;
  externalLinks?: SanityExternalLink[];
  publishedAt?: string;
  seo?: SanitySeo;
}

export interface SanityService {
  _id: string;
  _type: 'service';
  title: string;
  slug: { current: string };
  category?: string;
  shortDescription?: string;
  longDescription?: string;
  problems?: string[];
  approach?: string;
  deliverables?: string[];
  technologies?: SanityTechnology[];
  projects?: Array<{ _id: string; title: string; slug: { current: string } }>;
  faqs?: Array<{ question: string; answer: string }>;
  seo?: SanitySeo;
}

export interface SanityArticle {
  _id: string;
  _type: 'article';
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: unknown[];
  category?: string;
  featuredImage?: SanityImageAsset;
  externalUrl?: string;
  readingTime?: number;
  publishedAt?: string;
  updatedAt?: string;
  sources?: SanitySource[];
  seo?: SanitySeo;
}

export interface SanityExperiment {
  _id: string;
  _type: 'experiment';
  title: string;
  slug: { current: string };
  summary?: string;
  heroImage?: SanityImageAsset;
  gallery?: SanityImageAsset[];
  technologies?: SanityTechnology[];
  status?: 'active' | 'prototype' | 'archived';
  demoUrl?: string;
  codeUrl?: string;
  publishedAt?: string;
  seo?: SanitySeo;
}

export interface SanityNow {
  _id: string;
  _type: 'now';
  title?: string;
  location?: string;
  body?: unknown[];
  updatedAt?: string;
}

export interface SanityPerson {
  _id: string;
  _type: 'person';
  name: string;
  slug?: { current: string };
  role?: string;
  headline?: string;
  shortBio?: string;
  bio?: string;
  profileImage?: SanityImageAsset;
  location?: string;
  email?: string;
  phone?: string;
  socialProfiles?: SanitySocialProfile[];
  technologies?: SanityTechnology[];
  featuredProjects?: SanityProject[];
  resumeFileUrl?: string;
  seo?: SanitySeo;
}

export interface SanityRedirect {
  _id: string;
  _type: 'redirect';
  source: string;
  destination: string;
  permanent?: boolean;
}
