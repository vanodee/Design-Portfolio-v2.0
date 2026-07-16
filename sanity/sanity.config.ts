import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'my-portfolio-cms',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => schemaType !== 'siteSettings'),
  },

  document: {
    actions: (input, context) =>
      context.schemaType === 'siteSettings'
        ? input.filter(
            ({action}) => action !== 'duplicate' && action !== 'delete'
          )
        : input,
  },
})
