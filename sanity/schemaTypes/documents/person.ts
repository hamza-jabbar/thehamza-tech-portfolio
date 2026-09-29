import { defineField, defineType } from 'sanity';

export const person = defineType({
  name: 'person',
  title: 'Person / Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Hamza Jabbar',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Current Role / Title',
      type: 'string',
      placeholder: 'Software Developer • Full Stack & Mobile',
    }),
    defineField({
      name: 'headline',
      title: 'Headline / Tagline',
      type: 'string',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio (Sidebar / Cards)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bio',
      title: 'Full Biography',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile Picture / Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. London, UK / Remote',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone / Mobile',
      type: 'string',
    }),
    defineField({
      name: 'socialProfiles',
      title: 'Social Profiles',
      type: 'array',
      of: [{ type: 'socialProfile' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Top Skills / Technologies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'resume',
      title: 'Resume / CV PDF Document',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'profileImage',
    },
  },
});
