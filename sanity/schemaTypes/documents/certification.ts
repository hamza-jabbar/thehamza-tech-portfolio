import { defineField, defineType } from 'sanity';

export const certification = defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Certification Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuing Organization',
      type: 'string',
      placeholder: 'AWS, Google Cloud, Meta...',
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiration Date',
      type: 'date',
    }),
    defineField({
      name: 'credentialUrl',
      title: 'Credential Verification URL',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Issuer / Badge Logo',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'issuer',
      media: 'logo',
    },
  },
});
