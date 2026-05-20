// sanity/schemaTypes/publicitaria.ts

export const publicitaria = {


  name: 'publicitaria',

  title: 'Publicitaria',

  type: 'document',

  fields: [

    {
      name: 'title',
      title: 'Título',
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
      name: 'client',
      title: 'Cliente',
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