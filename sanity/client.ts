import {createClient} from 'next-sanity'

export const client = createClient({
  projectId: '2ab843hh',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
})