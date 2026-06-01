import {Resend} from 'resend'

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function sendOrderEmails({
  customerName,
  customerEmail,
  customerPhone,
  artwork,
  size,
  price,
  paymentId,
}: {
  customerName: string
  customerEmail: string
  customerPhone: string
  artwork: string
  size: string
  price: number
  paymentId: string
}) {

  await resend.emails.send({

    from:
      'Portfolio <hola@mauropretti.com>',

    to:
      process.env.CONTACT_EMAIL!,

    subject:
      'Nueva venta Fine Art',

    html: `
      <h2>Nueva venta</h2>

      <p><strong>Obra:</strong> ${artwork}</p>
      <p><strong>Tamaño:</strong> ${size}</p>
      <p><strong>Precio:</strong> $${price}</p>

      <hr />

      <p><strong>Nombre:</strong> ${customerName}</p>
      <p><strong>Email:</strong> ${customerEmail}</p>
      <p><strong>Teléfono:</strong> ${customerPhone}</p>

      <p><strong>Payment ID:</strong> ${paymentId}</p>
    `,
  })

  await resend.emails.send({

    from:
      'Portfolio <hola@mauropretti.com>',

    to:
      customerEmail,

    subject:
      'Gracias por tu compra',

    html: `
      <h2>Gracias por tu compra</h2>

      <p>Tu pago fue recibido correctamente.</p>

      <p><strong>Obra:</strong> ${artwork}</p>
      <p><strong>Tamaño:</strong> ${size}</p>
      <p><strong>Precio:</strong> $${price}</p>

      <br />

      <p>
        Me pondré en contacto contigo
        para coordinar producción y envío.
      </p>

      <p>
        Mauro Pretti
      </p>
    `,
  })

}