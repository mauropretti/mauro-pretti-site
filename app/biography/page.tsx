import Header from '../components/Header'

export default function BiographyPage() {

  return (

    <main className="bg-[#f4f4f1] text-black min-h-screen overflow-hidden">

      <Header />

      {/* CONTENT */}

      <section className="pt-32 md:pt-40 px-6 md:px-10 pb-40">

        <div className="max-w-[900px]">

          {/* LABEL */}

          <p
            className="
              text-[12px]
              md:text-[13px]

              lowercase

              tracking-[-0.01em]

              text-[#4940d8]/70

              mb-6
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            biografía
          </p>

          {/* TITLE */}

          <h1
            className="
              text-[28px]
              sm:text-[34px]
              md:text-[48px]
              lg:text-[58px]

              leading-[0.92]

              tracking-[-0.06em]

              font-light

              text-[#4940d8]

              mb-10
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >
            Mauro Pretti
          </h1>

          {/* TEXT */}

          <div
            className="
              text-[16px]
              md:text-[18px]

              leading-[1.8]

              text-black/55

              space-y-10
            "
            style={{
              fontFamily:
                'Inter, Helvetica, Arial, sans-serif',
            }}
          >

            <p>
(1986) Paraná, Entre Ríos, Argentina.            </p>

            <p>
              Fotógrafo. Estudió y se graduó en la Escuela de Fotografía Creativa Andy Goldstein en 2017. Actualmente desarrolla su práctica y reside en Buenos Aires.
            </p>

            <p>
              Desde la fotografía creativa, desarrolla atmósferas contemplativas que invitan a una observación sensible, evocando imaginarios del inconsciente colectivo atravesados por el goce y la reinterpretación. Sus imágenes abordan vivencias, recuerdos y percepciones íntimas intervenidas por el cuerpo, la naturaleza y la arquitectura. A través de la recreación y reinterpretación de escenarios, construye espacios donde la intimidad, la memoria y la experiencia se tensionan en estados de impermanencia.
            </p>

            <p>
              Complementó su formación a través de cursos y talleres de escritura, arte oriental y estética, performance corporal, montaje y conservación de obra, dictados por Maricel Álvarez, Silvia Elena Calvo, Tomás Lynch y Marcos López, entre otros.
            </p>

            <p>
              Su obra formó parte de exposiciones individuales y colectivas, además de publicaciones impresas y revistas digitales.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}