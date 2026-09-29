import { defineField, defineType } from 'sanity';

export const legacyPortfolio = defineType({
  name: 'portfolio',
  title: 'Portfolio (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'position', title: 'Position', type: 'string' }),
    defineField({
      name: 'files',
      title: 'Files',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'projectFile',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({
              name: 'fileType',
              title: 'File Type',
              type: 'string',
              options: { list: ['img', 'pdf', 'url', 'fig', 'txt'] },
            }),
            defineField({ name: 'href', title: 'Link Href', type: 'url' }),
            defineField({ name: 'asset', title: 'Asset Image / File', type: 'image' }),
            defineField({ name: 'position', title: 'Position', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'string' }] }),
          ],
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'skill' }] }],
    }),
  ],
});

export const legacySkill = defineType({
  name: 'skill',
  title: 'Skill (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'skills', title: 'Sub-skills', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'portfolio' }] }],
    }),
  ],
});

export const legacySkillsCategory = defineType({
  name: 'skillsCategory',
  title: 'Skills Category (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text' }),
  ],
});

export const legacyPhoto = defineType({
  name: 'photo',
  title: 'Photo (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'skillsCategory' }],
    }),
  ],
});

export const legacyAboutMe = defineType({
  name: 'aboutMe',
  title: 'About Me (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'image', title: 'Profile Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'mobile', title: 'Mobile', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'links',
      title: 'Social / Contact Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'aboutLink',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'icon', title: 'Icon', type: 'image' }),
            defineField({ name: 'bg', title: 'Background Color', type: 'string' }),
          ],
        },
      ],
    }),
  ],
});

export const legacyResume = defineType({
  name: 'resume',
  title: 'Resume (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'file', title: 'Resume PDF File', type: 'file' }),
  ],
});

export const legacyBackground = defineType({
  name: 'background',
  title: 'Background Wallpaper (Legacy)',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'desktopImage', title: 'Desktop Wallpaper', type: 'image' }),
    defineField({ name: 'mobileImage', title: 'Mobile Wallpaper', type: 'image' }),
  ],
});
