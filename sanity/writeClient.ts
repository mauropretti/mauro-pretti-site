import {createClient} from 'next-sanity'

export const writeClient = createClient({
  projectId: '2ab843hh',
  dataset: 'production',

  apiVersion: '2025-01-01',

  token: process.env.SANITY_API_TOKEN,

  useCdn: false,
})
