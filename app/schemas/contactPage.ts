import {defineField, defineType} from 'sanity'

export const contactPageType = defineType({

  name: 'contactPage',

  title: 'Contact Page',

  type: 'document',

  fields: [

    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),

    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
    }),

  ],

})