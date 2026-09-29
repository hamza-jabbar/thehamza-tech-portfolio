import { defineField, defineType } from 'sanity';

export const socialProfile = defineType({
  name: 'socialProfile',
  title: 'Social Profile',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g. GitHub, LinkedIn, X, Dribbble',
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Handle / Username',
      type: 'string',
      placeholder: 'e.g. @hamzajabbar',
    }),
    defineField({
      name: 'icon',
      title: 'Custom Icon',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'url',
      media: 'icon',
    },
  },
});
