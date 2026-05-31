
import Header from '../components/Header'

export default function PendingPage() {

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen">

      <Header />

      <section className="pt-40 px-6 md:px-10">

        <div className="max-w-[700px]">

          <p className="text-[#4940d8]/70 text-[13px] lowercase mb-6">
            pago pendiente
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
            Pago en proceso
          </h1>

          <p className="text-[18px] text-black/60 leading-[1.8]">
            Tu pago está siendo procesado por Mercado Pago.
            Te notificaremos cuando sea confirmado.
          </p>

        </div>

      </section>

    </main>

  )

}
