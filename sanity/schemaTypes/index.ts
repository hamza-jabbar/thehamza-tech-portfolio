import { seo } from './objects/seo';
import { socialProfile } from './objects/socialProfile';
import { externalLink } from './objects/externalLink';
import { source } from './objects/source';

import { siteSettings } from './documents/siteSettings';
import { person } from './documents/person';
import { project } from './documents/project';
import { service } from './documents/service';
import { article } from './documents/article';
import { experiment } from './documents/experiment';
import { organisation } from './documents/organisation';
import { technology } from './documents/technology';
import { testimonial } from './documents/testimonial';
import { experience } from './documents/experience';
import { education } from './documents/education';
import { certification } from './documents/certification';
import { now } from './documents/now';
import { redirect } from './documents/redirect';

import {
  legacyPortfolio,
  legacySkill,
  legacySkillsCategory,
  legacyPhoto,
  legacyAboutMe,
  legacyResume,
  legacyBackground,
} from './documents/legacy';

export const schemaTypes = [
  // Objects
  seo,
  socialProfile,
  externalLink,
  source,

  // Primary Documents
  siteSettings,
  person,
  project,
  service,
  article,
  experiment,
  organisation,
  technology,
  testimonial,
  experience,
  education,
  certification,
  now,
  redirect,

  // Legacy Documents (Maintained for full backward-compatibility)
  legacyPortfolio,
  legacySkill,
  legacySkillsCategory,
  legacyPhoto,
  legacyAboutMe,
  legacyResume,
  legacyBackground,
];
