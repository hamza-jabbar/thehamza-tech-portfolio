import { defineField, defineType } from 'sanity';

export const experiment = defineType({
  name: 'experiment',
  title: 'Lab / Experiment',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Preview Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Screenshots / Recordings',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Explored',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active Concept', value: 'active' },
          { title: 'Working Prototype', value: 'prototype' },
          { title: 'Archived Lab', value: 'archived' },
        ],
      },
      initialValue: 'prototype',
    }),
    defineField({
      name: 'demoUrl',
      title: 'Live Interactive Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'codeUrl',
      title: 'Source Code URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date Logged',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'heroImage',
    },
  },
});
