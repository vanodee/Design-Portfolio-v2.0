// schemas/toolType.ts
import { defineType, defineField } from 'sanity'

export const toolType = defineType({
  name: 'tools',
  title: 'Tools',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tool Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Tool Icon/Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'color',
      title: 'Tool Color',
      type: 'string',
      description: 'Hex or color name used for UI display',
    }),
  ],
})
