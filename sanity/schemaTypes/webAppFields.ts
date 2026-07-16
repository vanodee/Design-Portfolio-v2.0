// schemas/webAppFields.ts
import { defineField } from 'sanity'
import { makeTeaserFields, makeOutcomesFields, makeKeyLearningsFields, makeWhatWorkedFields, makeItemFields } from './shared/fieldGroups'

export const webAppFields = [
  // ===== Teaser Image Section =========================================================
  ...makeTeaserFields('webApp_', 'Web Apps'),

  // ===== Product Context ===============================================================
  defineField({
    name: 'webApp_productContextHeading',
    title: 'Product Context Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for Product Context',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_productContext',
    title: 'Product Context',
    type: 'text',
    group: 'project-specific',
    rows: 3,
    description: 'Text for Product Context',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_productContextImage',
    title: 'Product Context Image',
    type: 'imageWithAlt',
    group: 'project-specific',
    options: { hotspot: true },
    description: 'Image supporting Product Context',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_productContextVideo',
    title: 'Product Context Video',
    type: 'file',
    group: 'project-specific',
    options: { accept: 'video/mp4,video/webm' },
    description: 'Video supporting Product Context',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_productContextVideoPoster',
    title: 'Product Context Video Poster',
    type: 'imageWithAlt',
    group: 'project-specific',
    options: { hotspot: true },
    description: 'Optional fallback poster image for video supporting Product Context',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Problems & Goals ===============================================================
  defineField({
    name: 'webApp_probGoals',
    title: 'Problems & Goals',
    type: 'array',
    group: 'project-specific',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'probGoalName', title: 'Problem/Goal Name', type: 'string' },
          { name: 'probGoalList', title: 'Problem/Goal List', type: 'array', of: [{ type: 'string' }], description: 'List of problms/goals' },
        ],
      },
    ],
    description: 'List of problems/Goals',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Discovery Strategy ===============================================================
  defineField({
    name: 'webApp_productStratHeading',
    title: 'Product Strategy Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for Product Strategy section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_productStratContent',
    title: 'Product Strategy Content',
    type: 'text',
    group: 'project-specific',
    rows: 3,
    description: 'Text content explaining Product Strategy findings',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== UX Hypothesis ===============================================================
  defineField({
    name: 'webApp_uxHypothesisHeading',
    title: 'UX Hypothesis Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for Brand UX Hypothesis',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_uxHypothesis',
    title: 'UX Hypothesis',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'string' }],
    description: 'List of Brand UX Hypothesis',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_uxHypothesisImage',
    title: 'UX Hypothesis Image',
    type: 'imageWithAlt',
    group: 'project-specific',
    options: { hotspot: true },
    description: 'Image supporting UX Hypothesis',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_uxHypothesisVideo',
    title: 'UX Hypothesis Video',
    type: 'file',
    group: 'project-specific',
    options: { accept: 'video/mp4,video/webm' },
    description: 'Video supporting UX Hypothesis',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_uxHypothesisVideoPoster',
    title: 'UX Hypothesis Video Poster',
    type: 'imageWithAlt',
    group: 'project-specific',
    options: { hotspot: true },
    description: 'Optional fallback poster image for video supporting UX Hypothesis',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_initialDesignImages',
    title: 'Initial Design Images',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'imageWithAlt' }],
    description: 'Images for the products initial design',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_initialDesignVideos',
    title: 'Initial Design Videos',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'file', options: { accept: 'video/mp4,video/webm' } }],
    description: 'Videos for the products initial design',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_initialDesignVideoPosters',
    title: 'Initial Design Video Posters',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'imageWithAlt' }],
    description: 'Optional fallback poster images for videos for the products initial design',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Project Scope Section =========================================================
  defineField({
    name: 'webApp_prodScopeHeading',
    title: 'Product Scope Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for Product Scope section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_prodScope',
    title: 'Product Scope Text',
    type: 'text',
    group: 'project-specific',
    rows: 3,
    description: 'Text explaining the project Product Scope',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  defineField({
    name: 'webApp_prodScopeItems',
    title: 'Product Scope Items',
    type: 'array',
    group: 'project-specific',
    of: [
      {
        type: 'object',
        fields: [
          { name: 'itemTitle', title: 'Product Scope Item Title', type: 'string', description: 'e.g., "Orientation", "Navigation"' },
          { name: 'itemRationale', title: 'Product Scope Item Rationale', type: 'text', rows: 2, description: 'Description of scope rationale' },
        ],
      },
    ],
    description: 'List Product Scope Items',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Design Section ===============================================================
  defineField({
    name: 'webApp_designSectionHeading',
    title: 'Design Section Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for Design Section section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_designSectionText',
    title: 'Design Section Text',
    type: 'text',
    group: 'project-specific',
    rows: 3,
    description: 'Text content explaining Design Section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_designSectionImages',
    title: 'Design Section Images',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'imageWithAlt' }],
    description: 'Images for the Design Section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_designSectionVideos',
    title: 'Design Section Videos',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'file', options: { accept: 'video/mp4,video/webm' } }],
    description: 'Videos for the Design Section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_designSectionVideoPosters',
    title: 'Design Section Video Posters',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'imageWithAlt' }],
    description: 'Optional fallback poster images for videos for the Design Section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_designSectionItems',
    title: 'Design Section Breakdown',
    type: 'array',
    group: 'project-specific',
    of: [
      {
        type: 'object',
        fields: makeItemFields('item', 'Design Item'),
      },
    ],
    description: 'List of Design considerations with details',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Developer Section ===============================================================
  defineField({
    name: 'webApp_devSectionHeading',
    title: 'Developer Section Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for Developer Section section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_devSectionText',
    title: 'Developer Section Text',
    type: 'text',
    group: 'project-specific',
    rows: 3,
    description: 'Text content explaining Developer Section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_devSectionItems',
    title: 'Developer Section Breakdown',
    type: 'array',
    group: 'project-specific',
    of: [
      {
        type: 'object',
        fields: makeItemFields('item', 'Developer Item'),
      },
    ],
    description: 'List of Developer considerations with details',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Finished Product Section =========================================================
  defineField({
    name: 'webApp_finishedProdHeading',
    title: 'Finished Product Heading',
    type: 'string',
    group: 'project-specific',
    description: 'Heading for the Finished Product section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_finishedProdText',
    title: 'Finished Product Section Text',
    type: 'text',
    group: 'project-specific',
    rows: 3,
    description: 'Text for the Finished Product section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_finishedProdImages',
    title: 'Finished Product Section Images',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'imageWithAlt' }],
    description: 'Images for the Finished Product section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_finishedProdVideos',
    title: 'Finished Product Section Videos',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'file', options: { accept: 'video/mp4,video/webm' } }],
    description: 'Videos for the Finished Product section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),
  defineField({
    name: 'webApp_finishedProdVideoPosters',
    title: 'Finished Product Section Video Posters',
    type: 'array',
    group: 'project-specific',
    of: [{ type: 'imageWithAlt' }],
    description: 'Optional fallback poster images for videos for the Finished Product section',
    hidden: ({ parent }) => parent?.categoryName !== 'Web Apps',
  }),

  // ===== Outcomes Section =========================================================
  ...makeOutcomesFields('webApp_', 'Web Apps'),

  // ===== Key Learnings Section ===============================================================
  ...makeKeyLearningsFields('webApp_', 'Web Apps'),

  // ===== What Worked Section ===============================================================
  ...makeWhatWorkedFields('webApp_', 'Web Apps'),
]
