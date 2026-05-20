// sanity/schemaTypes/teatro.ts

export const teatro = {



  name: 'teatro',

  title: 'Teatro',

  type: 'document',

  fields: [

    {
      name: 'title',
      title: 'Obra',
      type: 'string',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',

      options: {
        source: 'title',
        maxLength: 96,
      },
    },

    {
      name: 'year',
      title: 'Año',
      type: 'string',
    },

    {
      name: 'director',
      title: 'Dirección',
      type: 'string',
    },

    {
      name: 'theater',
      title: 'Teatro',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
    },

    {
      name: 'coverImage',
      title: 'Imagen portada',
      type: 'image',

      options: {
        hotspot: true,
      },
    },

    {
      name: 'gallery',
      title: 'Galería',

      type: 'array',

      of: [
        {
          type: 'image',

          options: {
            hotspot: true,
          },
        },
      ],
    },

  ],
}