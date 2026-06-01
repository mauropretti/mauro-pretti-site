import {defineField, defineType} from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Orders',
  type: 'document',

  fields: [

    defineField({
      name: 'paymentId',
      title: 'Payment ID',
      type: 'string',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
    }),

    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),

    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),

    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
    }),

    defineField({
      name: 'artwork',
      title: 'Artwork',
      type: 'string',
    }),

    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),

    defineField({
      name: 'paidAmount',
      title: 'Monto cobrado real',
      type: 'number',
      description: 'Monto efectivamente cobrado por Mercado Pago (transaction_amount). Debe coincidir con Price.',
    }),

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),

  ],
})