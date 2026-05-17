import {defineField, defineType} from 'sanity'

export const settingsType = defineType({

  name: 'settings',

  title: 'Site Settings',

  type: 'document',

  fields: [

    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),

    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'text',
    }),

    defineField({
      name: 'homepageHeroText',
      title: 'Homepage Hero Text',
      type: 'string',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),

    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'string',
    }),

    defineField({
      name: 'behanceUrl',
      title: 'Behance URL',
      type: 'string',
    }),

    defineField({
      name: 'contactText',
      title: 'Contact Text',
      type: 'text',
    }),

  ],

})