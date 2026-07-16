// schemas/shared/fieldGroups.ts
import { defineField } from 'sanity'

function hiddenFor(categoryMatch: string) {
  return ({ parent }: { parent?: any }) => parent?.categoryName !== categoryMatch
}

// Teaser image/video/poster triplet, identical across Web Apps, Websites, and Logos & Branding.
export function makeTeaserFields(prefix: string, categoryMatch: string) {
  const hidden = hiddenFor(categoryMatch)
  return [
    defineField({
      name: `${prefix}teaserImages`,
      title: 'Teaser Images',
      type: 'array',
      group: 'project-specific',
      of: [{ type: 'imageWithAlt' }],
      description: 'Images showing early teasers of the final designs',
      hidden,
    }),
    defineField({
      name: `${prefix}teaserVideos`,
      title: 'Teaser Videos',
      type: 'array',
      group: 'project-specific',
      of: [{ type: 'file', options: { accept: 'video/mp4,video/webm' } }],
      description: 'Videos showing early teasers of the final designs',
      hidden,
    }),
    defineField({
      name: `${prefix}teaserVideoPosters`,
      title: 'Teaser Video Posters',
      type: 'array',
      group: 'project-specific',
      of: [{ type: 'imageWithAlt' }],
      description: 'Optional fallback poster images for videos showing early teasers of the final designs',
      hidden,
    }),
  ]
}

// Outcomes section: section heading, main outcome heading/text, and an array of other outcomes.
export function makeOutcomesFields(prefix: string, categoryMatch: string) {
  const hidden = hiddenFor(categoryMatch)
  return [
    defineField({
      name: `${prefix}outcomesSectionHeading`,
      title: 'Outcomes Section Heading',
      type: 'string',
      group: 'project-specific',
      description: 'Heading for outcomes section',
      hidden,
    }),
    defineField({
      name: `${prefix}mainOutcomeHeading`,
      title: 'Main Outcome Heading',
      type: 'string',
      group: 'project-specific',
      description: 'Heading for Main Outcome',
      hidden,
    }),
    defineField({
      name: `${prefix}mainOutcomeText`,
      title: 'Main Outcome Text',
      type: 'text',
      group: 'project-specific',
      rows: 3,
      description: 'Text explaining the main outcome',
      hidden,
    }),
    defineField({
      name: `${prefix}otherOutcomes`,
      title: 'Other Outcomes',
      type: 'array',
      group: 'project-specific',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'outcomeTitle', title: 'Outcome Title', type: 'string', description: 'e.g., "Strategic Impact", "Visual Impact"' },
            { name: 'outcomeDescription', title: 'Outcome Description', type: 'text', rows: 2, description: 'Description of what the outcome' },
          ],
        },
      ],
      description: 'List of additional outcomes and their details',
      hidden,
    }),
  ]
}

// Key-learnings section: heading, optional text, bullet list, and an image/video/poster.
export function makeKeyLearningsFields(prefix: string, categoryMatch: string) {
  const hidden = hiddenFor(categoryMatch)
  return [
    defineField({ name: `${prefix}keyLearnHeading`, title: 'Key learnings Heading', type: 'string', group: 'project-specific', description: 'Heading for Key Learnings', hidden }),
    defineField({ name: `${prefix}keyLearnText`, title: 'Key Learnings Text', type: 'text', group: 'project-specific', rows: 3, description: 'Text for key learnings', hidden }),
    defineField({ name: `${prefix}keyLearnList`, title: 'Key Learnings List', type: 'array', group: 'project-specific', of: [{ type: 'string' }], description: 'List of key learnings', hidden }),
    defineField({ name: `${prefix}keyLearnImage`, title: 'Key Learnings Image', type: 'imageWithAlt', group: 'project-specific', options: { hotspot: true }, description: 'Image supporting Key Learnings', hidden }),
    defineField({ name: `${prefix}keyLearnVideo`, title: 'Key Learnings Video', type: 'file', group: 'project-specific', options: { accept: 'video/mp4,video/webm' }, description: 'Video supporting Key Learnings', hidden }),
    defineField({ name: `${prefix}keyLearnVideoPoster`, title: 'Key Learnings Video Poster', type: 'imageWithAlt', group: 'project-specific', options: { hotspot: true }, description: 'Optional fallback poster image for video supporting Key Learnings', hidden }),
  ]
}

// What-worked section: same shape as key-learnings.
export function makeWhatWorkedFields(prefix: string, categoryMatch: string) {
  const hidden = hiddenFor(categoryMatch)
  return [
    defineField({ name: `${prefix}whatWorkedHeading`, title: 'What Worked Heading', type: 'string', group: 'project-specific', description: 'Heading for What Worked', hidden }),
    defineField({ name: `${prefix}whatWorkedText`, title: 'What Worked Text', type: 'text', group: 'project-specific', rows: 3, description: 'Text for What Worked', hidden }),
    defineField({ name: `${prefix}whatWorkedList`, title: 'What Worked List', type: 'array', group: 'project-specific', of: [{ type: 'string' }], description: 'List of What Worked', hidden }),
    defineField({ name: `${prefix}whatWorkedImage`, title: 'What Worked Image', type: 'imageWithAlt', group: 'project-specific', options: { hotspot: true }, description: 'Image supporting What Worked', hidden }),
    defineField({ name: `${prefix}whatWorkedVideo`, title: 'What Worked Video', type: 'file', group: 'project-specific', options: { accept: 'video/mp4,video/webm' }, description: 'Video supporting What Worked', hidden }),
    defineField({ name: `${prefix}whatWorkedVideoPoster`, title: 'What Worked Video Poster', type: 'imageWithAlt', group: 'project-specific', options: { hotspot: true }, description: 'Optional fallback poster image for video supporting What Worked', hidden }),
  ]
}

// Shared "item" sub-object shape used inside bespoke breakdown arrays: name + points (bullet
// list) + image + video + videoPoster. `fieldPrefix` controls the actual field names (must match
// whatever is already authored in existing content — do not change without a data migration);
// `label` controls the human-readable title prefix shown in the Studio only.
export function makeItemFields(fieldPrefix: string, label: string) {
  const lowerLabel = label.toLowerCase()
  return [
    { name: `${fieldPrefix}Name`, title: `${label} Name`, type: 'string' },
    { name: `${fieldPrefix}Points`, title: `${label} Points`, type: 'array', of: [{ type: 'string' }], description: 'Breakdown bullet points' },
    { name: `${fieldPrefix}Image`, title: `${label} Image`, type: 'imageWithAlt', options: { hotspot: true }, description: `Screenshot or visual supporting ${lowerLabel}` },
    { name: `${fieldPrefix}Video`, title: `${label} Video`, type: 'file', options: { accept: 'video/mp4,video/webm' }, description: `Screenshot or visual supporting ${lowerLabel}` },
    { name: `${fieldPrefix}VideoPoster`, title: `${label} Video Poster`, type: 'imageWithAlt', options: { hotspot: true }, description: `Optional fallback poster image for screenshot or visual supporting ${lowerLabel}` },
  ]
}
