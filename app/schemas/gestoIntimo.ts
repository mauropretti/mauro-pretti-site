// sanity/schemaTypes/gestoIntimo.ts

export const gestoIntimo = {

  name: 'gestoIntimo',

  title: 'El gesto íntimo',

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
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
    },

    {
      name: 'curatorialText',
      title: 'Texto curatorial',
      type: 'text',
    },

    {
      name: 'poem',
      title: 'Poema / texto',
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

    {
      name: 'pdf',
      title: 'PDF catálogo',

      type: 'file',
    },

    {
      name: 'videoUrl',
      title: 'Video URL',

      type: 'url',
    },

  ],
}