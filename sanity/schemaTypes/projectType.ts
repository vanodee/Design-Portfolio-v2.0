// schemas/projectType.ts
import { defineType, defineField } from 'sanity'
import CategoryWithSyncInput from '../components/categoryWithSyncInput'
import { webAppFields } from './webAppFields'
import { websiteFields } from './websiteFields'
import { uxCaseStudyFields } from './uxCaseStudyFields'
import { logoBrandingFields } from './logoBrandingFields'


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
      components: {
        input: CategoryWithSyncInput,
      },
    }),

    // ---------- Hidden Category Field ------------------
    defineField({
        name: 'categoryName',
        title: 'Project Category [Autofill]',
        type: 'string',
        group: 'general',
        readOnly: true,
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
      name: 'projectColor',
      title: 'Project Color',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'projectColorDark',
      title: 'Project Color [Dark]',
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
    defineField({
      name: 'projectTags',
      title: 'Project Tags',
      type: 'array',
      group: 'general',
      of: [{ type: 'string' }],
      description: 'List of methodology/deliverable tags (e.g., "Market Research", "Competitive Analysis", etc.)',
    }),
    defineField({
      name: 'quickStats',
      title: 'Project Quick Stats',
      type: 'array',
      group: 'general',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Stat Title', type: 'string', description: 'e.g., "Project Type", "Timeline"' },
            { name: 'value', title: 'Stat Value', type: 'string', description: 'Value of this Stat' },
          ],
        },
      ],
      description: 'List of quick stats for this project',
    }),
    defineField({
      name: 'ctaColor',
      title: 'Background Color of Project CTA [Hexcode]',
      type: 'string',
      group: 'general',
      description: 'e.g., "#940F84"',
    }),
    defineField({
      name: 'liveLinks',
      title: 'Project Live Links',
      type: 'array',
      group: 'general',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Primary CTA', type: 'string', description: 'e.g., "View Interactive Prototype"' },
            { name: 'subText', title: 'Sub-Text in Parenthesis', type: 'string', description: 'e.g., "Desktop", "Mobile", "Responsive"' },
            { 
              name: 'ctaIcon', 
              title: 'CTA Icon', 
              type: 'string', 
              options: {
                list: [
                  { title: 'Desktop', value: 'desktop' },
                  { title: 'Mobile', value: 'mobile' },
                  { title: 'Responsive', value: 'responsive' },
                ],
                layout: 'dropdown',
              },
            },
            { name: 'url', title: 'URL to the live project/prototype', type: 'string', description: 'Preferably "https://..."' },
          ],
        },
      ],
      description: 'Links to Live versions this project',
    }),

    // ===== Web App Fields =================================================================
    ...webAppFields,
  

    // ===== Wbsite Fields =================================================================
    ...websiteFields,


    // ===== UX Case Study Fields =========================================================
    ...uxCaseStudyFields,


    // ===== Logo & Brand Design Fields =================================================================
    ...logoBrandingFields,


    // ===== Closing Fields =============================================================================
    defineField({
      name: 'closingImage',
      title: 'Closing Image',
      type: 'image',
      group: 'general',
      options: { hotspot: true },
      description: 'Final hero image or mockup to close the case study',
    }),
  ],
})