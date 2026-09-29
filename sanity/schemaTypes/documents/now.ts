import { defineField, defineType } from 'sanity';

export const now = defineType({
  name: 'now',
  title: 'Now Page (/now)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'What I`m Doing Now',
    }),
    defineField({
      name: 'location',
      title: 'Current Base / Location',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'updatedAt',
    },
  },
});
