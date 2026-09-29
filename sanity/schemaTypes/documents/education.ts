import { defineField, defineType } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution / University',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree / Certificate',
      type: 'string',
      placeholder: 'e.g. BSc (Hons) Computer Science',
    }),
    defineField({
      name: 'field',
      title: 'Field of Study',
      type: 'string',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
      placeholder: '2020',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'string',
      placeholder: '2024 / Present',
    }),
    defineField({
      name: 'description',
      title: 'Description / Highlights',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'institution',
      subtitle: 'degree',
    },
  },
});
