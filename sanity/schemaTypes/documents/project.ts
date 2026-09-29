import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'person',
      title: 'Author / Lead',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'client',
      title: 'Client / Company Name',
      type: 'string',
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'reference',
      to: [{ type: 'organisation' }],
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Web Application', value: 'web' },
          { title: 'Mobile App', value: 'mobile' },
          { title: 'Full Stack', value: 'fullstack' },
          { title: 'Open Source', value: 'open-source' },
          { title: 'Design System / UI', value: 'design-system' },
          { title: 'Tool / CLI', value: 'tool' },
        ],
      },
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      placeholder: 'Fintech, SaaS, E-Commerce, DevTools...',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Completed', value: 'completed' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'completed',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'objective',
      title: 'Objective & Scope',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'strategy',
      title: 'Strategy & Architecture',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'execution',
      title: 'Execution & Development',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'outcome',
      title: 'Outcome & Metrics',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
    }),
    defineField({
      name: 'testimonial',
      title: 'Client Testimonial',
      type: 'reference',
      to: [{ type: 'testimonial' }],
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Links (Demo, Code, etc.)',
      type: 'array',
      of: [{ type: 'externalLink' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
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
      subtitle: 'client',
      media: 'heroImage',
    },
  },
});
