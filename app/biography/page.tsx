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
{/* IMAGE */}

<div className="mb-12">
  <img
    src="/bio/mauro-pretti.webp"
    alt="Mauro Pretti portrait"
    className="
      w-[120px]
      md:w-[160px]

      h-auto

      object-cover

      rounded-[2px]
    "
  />
</div>
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
              (1986) Paraná, Entre Ríos, Argentina.
            </p>

            <p>
              Fotógrafo. Estudió y se graduó en la Escuela de
              Fotografía Creativa Andy Goldstein en el año 2017.
            </p>

            <p>
              Está abocado a la fotografía creativa en su búsqueda
              de expresar y materializar diferentes experiencias y
              etapas utilizando elementos de la naturaleza, el cuerpo
              humano y la arquitectura. Así también como crear y
              reinterpretar escenarios y vincularlos con la intimidad.
            </p>

            <p>
              Realizó diversos cursos y talleres de escritura, arte
              oriental y su estética, performance corporal, así como
              montaje y conservación de obras dictados por Maricel
              Álvarez, Silvia Elena Calvo, Tomás Lynch, Marcos López,
              entre otros.
            </p>

            <p>
              Su obra se expuso en diferentes muestras colectivas,
              arte impresa y revistas digitales.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}