import { defineField, defineType } from 'sanity';

export const redirect = defineType({
  name: 'redirect',
  title: 'URL Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: '/old-link or /cv',
    }),
    defineField({
      name: 'destination',
      title: 'Destination URL or Path',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: '/resume or https://...',
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (308) vs Temporary (307)',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'source',
      subtitle: 'destination',
    },
  },
});
