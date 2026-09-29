// Type-safe query definition helper compatible with GROQ & Sanity TypeGen
export const defineQuery = <const Q extends string>(query: Q): Q => query;

// ─── Site Settings ────────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    title,
    description,
    logo,
    contactEmail,
    socialProfiles[] {
      platform,
      url,
      handle,
      icon
    },
    seo
  }
`);

// ─── Person / Profile ─────────────────────────────────────────────────────────
export const PERSON_QUERY = defineQuery(`
  *[_type == "person"][0] {
    _id,
    _type,
    name,
    slug,
    role,
    headline,
    shortBio,
    bio,
    profileImage,
    location,
    email,
    phone,
    socialProfiles[] {
      platform,
      url,
      handle,
      icon
    },
    "technologies": technologies[]-> {
      _id,
      _type,
      name,
      slug,
      icon,
      category,
      proficiency,
      website
    },
    "featuredProjects": featuredProjects[]-> {
      _id,
      _type,
      title,
      slug,
      summary,
      heroImage,
      projectType,
      status
    },
    "resumeFileUrl": resume.asset->url,
    seo
  }
`);

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    client,
    "organisation": organisation-> { _id, name, logo, website },
    projectType,
    industry,
    status,
    featured,
    summary,
    heroImage,
    gallery,
    "services": services[]-> { _id, title },
    "technologies": technologies[]-> { _id, name, icon, category },
    externalLinks[] {
      label,
      url,
      type
    },
    publishedAt,
    seo
  }
`);

export const FEATURED_PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && featured == true] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    client,
    "organisation": organisation-> { _id, name, logo, website },
    projectType,
    industry,
    status,
    featured,
    summary,
    heroImage,
    gallery,
    "services": services[]-> { _id, title },
    "technologies": technologies[]-> { _id, name, icon, category },
    externalLinks[] {
      label,
      url,
      type
    },
    publishedAt,
    seo
  }
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    client,
    "organisation": organisation-> { _id, name, logo, website },
    projectType,
    industry,
    status,
    featured,
    summary,
    heroImage,
    gallery,
    problem,
    objective,
    strategy,
    execution,
    outcome,
    "services": services[]-> { _id, title },
    "technologies": technologies[]-> { _id, name, icon, category },
    "testimonial": testimonial-> { quote, author, role, companyName, avatar },
    externalLinks[] {
      label,
      url,
      type
    },
    publishedAt,
    seo
  }
`);

// ─── Services ─────────────────────────────────────────────────────────────────
export const SERVICES_QUERY = defineQuery(`
  *[_type == "service"] | order(_createdAt asc) {
    _id,
    _type,
    title,
    slug,
    category,
    shortDescription,
    longDescription,
    problems,
    approach,
    deliverables,
    "technologies": technologies[]-> { _id, name, icon, category },
    "projects": projects[]-> { _id, title, slug },
    faqs[] {
      question,
      answer
    },
    seo
  }
`);

export const SERVICE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    category,
    shortDescription,
    longDescription,
    problems,
    approach,
    deliverables,
    "technologies": technologies[]-> { _id, name, icon, category },
    "projects": projects[]-> { _id, title, slug },
    faqs[] {
      question,
      answer
    },
    seo
  }
`);

// ─── Articles ─────────────────────────────────────────────────────────────────
export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    category,
    featuredImage,
    externalUrl,
    readingTime,
    publishedAt,
    updatedAt,
    sources[] {
      title,
      url,
      author,
      publishedAt
    },
    seo
  }
`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    body,
    category,
    featuredImage,
    externalUrl,
    readingTime,
    publishedAt,
    updatedAt,
    sources[] {
      title,
      url,
      author,
      publishedAt
    },
    seo
  }
`);

// ─── Experiments ──────────────────────────────────────────────────────────────
export const EXPERIMENTS_QUERY = defineQuery(`
  *[_type == "experiment"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    summary,
    heroImage,
    gallery,
    "technologies": technologies[]-> { _id, name, icon, category },
    status,
    demoUrl,
    codeUrl,
    publishedAt,
    seo
  }
`);

export const EXPERIMENT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "experiment" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    summary,
    heroImage,
    gallery,
    "technologies": technologies[]-> { _id, name, icon, category },
    status,
    demoUrl,
    codeUrl,
    publishedAt,
    seo
  }
`);

// ─── Now Page ─────────────────────────────────────────────────────────────────
export const NOW_QUERY = defineQuery(`
  *[_type == "now"][0] {
    _id,
    _type,
    title,
    location,
    body,
    updatedAt
  }
`);

// ─── Experiences, Education, Certifications ───────────────────────────────────
export const EXPERIENCES_QUERY = defineQuery(`
  *[_type == "experience"] | order(startDate desc) {
    _id,
    _type,
    role,
    "organisation": organisation-> { _id, name, logo, website },
    companyName,
    location,
    startDate,
    endDate,
    current,
    summary,
    responsibilities,
    "technologies": technologies[]-> { _id, name, icon, category }
  }
`);

export const EDUCATIONS_QUERY = defineQuery(`
  *[_type == "education"] | order(startYear desc) {
    _id,
    _type,
    institution,
    degree,
    field,
    startYear,
    endYear,
    description
  }
`);

export const CERTIFICATIONS_QUERY = defineQuery(`
  *[_type == "certification"] | order(issueDate desc) {
    _id,
    _type,
    title,
    issuer,
    issueDate,
    expiryDate,
    credentialUrl,
    logo
  }
`);

export const TECHNOLOGIES_QUERY = defineQuery(`
  *[_type == "technology"] | order(proficiency desc) {
    _id,
    _type,
    name,
    slug,
    icon,
    category,
    proficiency,
    website,
    featured
  }
`);
