import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content OS')
    .items([
      // Pinned Singletons
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Primary Person / Profile')
        .child(S.document().schemaType('person').documentId('person')),
      S.listItem()
        .title('Now Page (/now)')
        .child(S.document().schemaType('now').documentId('now')),

      S.divider(),

      // Core Portfolio Content
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .child(S.documentTypeList('project').title('All Projects')),
      S.listItem()
        .title('Services')
        .schemaType('service')
        .child(S.documentTypeList('service').title('Services')),
      S.listItem()
        .title('Articles & Insights')
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),
      S.listItem()
        .title('Lab Experiments')
        .schemaType('experiment')
        .child(S.documentTypeList('experiment').title('Lab Experiments')),

      S.divider(),

      // Career & Credentials
      S.listItem()
        .title('Work Experience')
        .schemaType('experience')
        .child(S.documentTypeList('experience').title('Work Experience')),
      S.listItem()
        .title('Education')
        .schemaType('education')
        .child(S.documentTypeList('education').title('Education')),
      S.listItem()
        .title('Certifications')
        .schemaType('certification')
        .child(S.documentTypeList('certification').title('Certifications')),
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem()
        .title('Technologies & Skills')
        .schemaType('technology')
        .child(S.documentTypeList('technology').title('Technologies & Skills')),
      S.listItem()
        .title('Organisations')
        .schemaType('organisation')
        .child(S.documentTypeList('organisation').title('Organisations')),

      S.divider(),

      // System / SEO
      S.listItem()
        .title('Redirects')
        .schemaType('redirect')
        .child(S.documentTypeList('redirect').title('Redirects')),

      S.divider(),

      // All Other Types (Including Legacy)
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return (
          id &&
          ![
            'siteSettings',
            'person',
            'now',
            'project',
            'service',
            'article',
            'experiment',
            'experience',
            'education',
            'certification',
            'testimonial',
            'technology',
            'organisation',
            'redirect',
          ].includes(id)
        );
      }),
    ]);
