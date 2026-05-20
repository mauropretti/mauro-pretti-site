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

        from:
          'Portfolio <onboarding@resend.dev>',

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