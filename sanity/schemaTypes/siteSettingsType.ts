// schemas/siteSettingsType.ts
import { defineType, defineField } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  preview: {
    select: {},
    prepare: () => ({ title: 'Site Settings', subtitle: 'Global site configuration' }),
  },
  fields: [
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL',
      type: 'url',
    }),
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'experienceItem',
          fields: [
            defineField({
              name: 'yearRange',
              title: 'Year Range',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Job Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'company',
              title: 'Company',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'company' },
          },
        },
      ],
    }),
    defineField({
      name: 'clients',
      title: 'Client / Brand Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'clientItem',
          fields: [
            defineField({
              name: 'name',
              title: 'Client Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'websiteUrl',
              title: 'Website URL',
              type: 'url',
            }),
          ],
          preview: {
            select: { title: 'name', media: 'logo' },
          },
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLinkItem',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              hidden: ({ parent }) => (parent as any)?.platform === 'Email',
              validation: (Rule) => Rule.custom((value, context) => {
                if ((context.parent as any)?.platform === 'Email') return true
                return value ? true : 'Required'
              }),
            }),
            defineField({
              name: 'email',
              title: 'Email',
              type: 'email',
              hidden: ({ parent }) => (parent as any)?.platform !== 'Email',
              validation: (Rule) => Rule.custom((value, context) => {
                if ((context.parent as any)?.platform !== 'Email') return true
                return value ? true : 'Required'
              }),
            }),
          ],
          preview: {
            select: { title: 'platform', url: 'url', email: 'email' },
            prepare: ({ title, url, email }) => ({ title, subtitle: url || email }),
          },
        },
      ],
    }),
  ],
})
