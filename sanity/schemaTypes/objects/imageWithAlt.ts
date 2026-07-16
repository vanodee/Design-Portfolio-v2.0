// schemas/objects/imageWithAlt.ts
import { defineType, defineField } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO.',
      validation: (Rule) => Rule.warning('Add alt text for accessibility and SEO.'),
    }),
  ],
})
