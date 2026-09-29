import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial / Endorsement',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation',
      type: 'reference',
      to: [{ type: 'organisation' }],
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name (Text fallback)',
      type: 'string',
    }),
    defineField({
      name: 'project',
      title: 'Associated Project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
    defineField({
      name: 'avatar',
      title: 'Author Avatar',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'linkedInUrl',
      title: 'Author LinkedIn URL',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
      media: 'avatar',
    },
  },
});
