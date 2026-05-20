'use client'

import {useState} from 'react'

import {sendContact} from '@/app/actions/sendContact'

export default function ContactForm() {

  const [loading, setLoading] =
    useState(false)

  const [success, setSuccess] =
    useState(false)

  async function handleSubmit(
    formData: FormData
  ) {

    try {

      setLoading(true)

      await sendContact(formData)

      setSuccess(true)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }

  }

  return (

    <form
      action={handleSubmit}

      className="
        flex
        flex-col

        gap-6

        max-w-[720px]

        mt-20
      "
    >

      <input
        type="text"
        name="name"
        placeholder="Nombre"

        required

        className="
          bg-transparent

          border-b
          border-black/10

          pb-4

          outline-none

          text-[16px]

          placeholder:text-black/30
        "
      />

      <input
        type="email"
        name="email"
        placeholder="Email"

        required

        className="
          bg-transparent

          border-b
          border-black/10

          pb-4

          outline-none

          text-[16px]

          placeholder:text-black/30
        "
      />

      <textarea
        name="message"
        placeholder="Mensaje"

        required

        rows={6}

        className="
          bg-transparent

          border-b
          border-black/10

          pb-4

          outline-none

          resize-none

          text-[16px]

          placeholder:text-black/30
        "
      />

      <button
        type="submit"

        disabled={loading}

        className="
          w-fit

          rounded-full

          border
          border-black/10

          px-6
          py-3

          text-[14px]

          transition-all
          duration-500

          hover:bg-black
          hover:text-white
        "
      >

        {loading
          ? 'Enviando...'
          : success
          ? 'Mensaje enviado'
          : 'Enviar'}

      </button>

    </form>

  )

}