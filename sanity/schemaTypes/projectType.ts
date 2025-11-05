// schemas/projectType.ts
import { defineType, defineField } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',

    groups: [
      {name: 'general', title: 'General'},
      {name: 'project-specific', title: 'Project Specific'},
    ],

  fields: [
    // ===== General Fields =========================================================
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        group: 'general',
        options: {
            source: 'title',
            maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      group: 'general',
      rows: 3,
    }),
    defineField({
      name: 'tools',
      title: 'Project Tools',
      type: 'array',
      group: 'general',
      of: [{ type: 'reference', to: [{ type: 'tools' }] }],
    }),
    defineField({
      name: 'category',
      title: 'Project Category',
      type: 'reference',
      group: 'general',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),

    // ---------- Hidden Category Field ------------------
    defineField({
        name: 'categoryName',
        title: 'Category Name',
        type: 'string',
        // hidden: true, // Hide it in Studio
    }),
    // ---------------------------------------------------
    
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),
    defineField({
      name: 'previewColor',
      title: 'Preview Color',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'general',
      description: 'Defaults to project title if left empty',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      group: 'general',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
    }),

    // ===== Logo & Brand Design Fields =========================================================
    defineField({
      name: 'clientSummary',
      title: 'Client Summary',
      type: 'text',
      group: 'project-specific',
      rows: 2,
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'clientContacts',
      title: 'Client Contact Info',
      type: 'array',
      group: 'project-specific',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'method', title: 'Contact Method', type: 'string' },
            { name: 'info', title: 'Contact Info', type: 'string' },
          ],
        },
      ],
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'jobSummary',
      title: 'Job Summary',
      type: 'text',
      group: 'project-specific',
      rows: 3,
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'liveMedia',
      title: 'Live Media (Optional Video or Link)',
      type: 'url',
      group: 'project-specific',
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'landscapeImages',
      title: 'Project Images - Landscape',
      type: 'array',
      group: 'project-specific',
      of: [{ type: 'image', options: { hotspot: true } }],
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'portraitImages',
      title: 'Project Images - Portrait',
      type: 'array',
      group: 'project-specific',
      of: [{ type: 'image', options: { hotspot: true } }],
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'designRationale',
      title: 'Design Rationale',
      type: 'text',
      group: 'project-specific',
      rows: 3,
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
    defineField({
      name: 'projectConclusion',
      title: 'Project Conclusion',
      type: 'text',
      group: 'project-specific',
      rows: 3,
      hidden: ({ parent }) => !['Logo Designs', 'Brand Designs'].includes(parent?.categoryTitle),
    }),
  ],
})
