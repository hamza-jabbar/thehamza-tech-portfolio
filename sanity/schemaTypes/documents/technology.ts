import { defineField, defineType } from 'sanity';

export const technology = defineType({
  name: 'technology',
  title: 'Technology / Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      placeholder: 'e.g. Next.js, TypeScript, PostgreSQL',
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
      name: 'icon',
      title: 'Icon / Logo',
      type: 'image',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'Mobile', value: 'mobile' },
          { title: 'Database / ORM', value: 'database' },
          { title: 'DevOps & Cloud', value: 'devops' },
          { title: 'Design & Prototyping', value: 'design' },
          { title: 'Tools & Utilities', value: 'tools' },
        ],
      },
      initialValue: 'frontend',
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level (1-100)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(100),
    }),
    defineField({
      name: 'website',
      title: 'Official Website / Docs',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured in Dock / Highlights',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'icon',
    },
  },
});
