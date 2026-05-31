import {defineField, defineType} from 'sanity'

export const product = defineType({
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
      description:
        'Ej: Refugio del viento, Desilusión, Habitual...',
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
  name: 'orientation',
  title: 'Orientation',
  type: 'string',
  options: {
    list: [
      {title: 'Vertical', value: 'vertical'},
      {title: 'Horizontal', value: 'horizontal'},
    ],
  },
}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
defineField({
  name: 'edition',
  title: 'Edition',
  type: 'string',
}),
    defineField({
      name: 'price20x30',
      title: 'Price 20×30',
      type: 'number',
    }),

    defineField({
      name: 'price30x45',
      title: 'Price 30×45',
      type: 'number',
    }),

    defineField({
      name: 'price50x70',
      title: 'Price 50×70',
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
