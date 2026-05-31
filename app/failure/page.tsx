
import Header from '../components/Header'

export default function FailurePage() {

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen">

      <Header />

      <section className="pt-40 px-6 md:px-10">

        <div className="max-w-[700px]">

          <p className="text-[#4940d8]/70 text-[13px] lowercase mb-6">
            pago rechazado
          </p>

          <h1
            className="
              text-[34px]
              md:text-[60px]

              tracking-[-0.06em]

              text-[#4940d8]

              mb-8
            "
          >
            No se pudo completar el pago
          </h1>

          <p className="text-[18px] text-black/60 leading-[1.8]">
            El pago fue cancelado o rechazado.
            Puedes volver a intentarlo cuando lo desees.
          </p>

        </div>

      </section>

    </main>

  )

}