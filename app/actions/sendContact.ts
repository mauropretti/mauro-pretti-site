'use server'

import {Resend} from 'resend'

const resend = new Resend(
  process.env.RESEND_API_KEY
)

export async function sendContact(
  formData: FormData
) {

  const name =
    formData.get('name') as string

  const email =
    formData.get('email') as string

  const message =
    formData.get('message') as string

  if (
    !name ||
    !email ||
    !message
  ) {

    throw new Error(
      'Missing fields'
    )

  }

  try {

    const data =
      await resend.emails.send({

        from: 'Mauro Pretti <hola@mauropretti.com>',

        to:
           process.env.CONTACT_EMAIL || '',

        subject:
          `Nuevo mensaje de ${name}`,

        replyTo:
          email,

        html: `
          <div
            style="
              font-family:
                Arial,
                sans-serif;

              padding:
                24px;
            "
          >

            <h2>
              Nuevo mensaje desde el portfolio
            </h2>

            <p>
              <strong>Nombre:</strong>
              ${name}
            </p>

            <p>
              <strong>Email:</strong>
              ${email}
            </p>

            <p>
              <strong>Mensaje:</strong>
            </p>

            <p>
              ${message}
            </p>

          </div>
        `,
      })

    console.log(data)
await resend.emails.send({

  from: 'Mauro Pretti <hola@mauropretti.com>',

  to: email,

  subject: 'He recibido tu mensaje',

  html: `

    <div
      style="
        max-width:600px;
        margin:0 auto;
        padding:40px 24px;

        font-family:
          Inter,
          Arial,
          sans-serif;

        color:#222;
      "
    >

      <div
        style="
          text-align:center;
          margin-bottom:32px;
        "
      >

        <img
          src="https://mauropretti.com/logo.png"
          alt="Mauro Pretti"
          style="
            max-width:220px;
            height:auto;
          "
        />

      </div>

      <p
        style="
          font-size:16px;
          line-height:1.8;
        "
      >

        Hola ${name},

      </p>

      <p
        style="
          font-size:16px;
          line-height:1.8;
        "
      >

        Gracias por escribirme.

        He recibido tu mensaje correctamente y te responderé a la brevedad.

      </p>

      <p
        style="
          font-size:16px;
          line-height:1.8;
        "
      >

        Mientras tanto, puedes visitar mi portfolio para conocer más sobre mis proyectos fotográficos, exposiciones y ediciones Fine Art.

      </p>

      <p
        style="
          margin-top:32px;

          font-size:16px;
          line-height:1.8;
        "
      >

        Mauro Pretti

        <br />

        Fotógrafo

      </p>

    </div>

  `,
})
    return {
      success: true,
    }

  } catch (error) {

    console.log(error)

    throw new Error(
      'Error sending email'
    )

  }

}