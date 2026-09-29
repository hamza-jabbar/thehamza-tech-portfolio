import { defineField, defineType } from 'sanity';

export const externalLink = defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'Live Demo, GitHub Repository, Figma...',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Live Demo', value: 'demo' },
          { title: 'Code Repository', value: 'repo' },
          { title: 'Design / Figma', value: 'figma' },
          { title: 'Article / Case Study', value: 'article' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'demo',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'url',
    },
  },
});
