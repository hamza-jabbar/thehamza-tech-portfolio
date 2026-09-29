import { defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      title: 'Role / Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organisation',
      title: 'Organisation / Company',
      type: 'reference',
      to: [{ type: 'organisation' }],
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name (Text fallback)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      placeholder: 'e.g. London, UK / Hybrid',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      hidden: ({ parent }) => !!parent?.current,
    }),
    defineField({
      name: 'current',
      title: 'I currently work here',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'summary',
      title: 'Overview',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities / Achievements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'technology' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'role',
      subtitle: 'companyName',
    },
  },
});
