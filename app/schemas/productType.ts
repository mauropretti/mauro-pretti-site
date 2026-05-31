import {defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Products',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'series',
      title: 'Series',
      type: 'string',
      description: 'Ej: Refugio del viento, Desilusión, Habitual...',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    defineField({
      name: 'price20x30',
      title: 'Price 20x30',
      type: 'number',
    }),

    defineField({
      name: 'price30x45',
      title: 'Price 30x45',
      type: 'number',
    }),

    defineField({
      name: 'price50x70',
      title: 'Price 50x70',
      type: 'number',
    }),

    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

  ],
})