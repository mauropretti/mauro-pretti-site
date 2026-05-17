import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Mauro Pretti',

  projectId: '2ab843hh',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})