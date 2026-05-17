import {defineField, defineType} from 'sanity'

export const advertisingType = defineType({

  name: 'advertising',

  title: 'Advertising',

  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    }),

    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image'}],
    }),

  ],

})