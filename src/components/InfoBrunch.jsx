
import { useRef } from 'react'
import { Container, Icon } from 'semantic-ui-react'

// Animaciones GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Estilos
import './InfoBrunch.css'

// Registrar los plugins
gsap.registerPlugin(useGSAP, ScrollTrigger)

function InfoBrunch() {

  // =========================================
  // 1. REFERENCIA A LA SECCIÓN
  // =========================================

  const seccionRef = useRef(null)


  // =========================================
  // 2. ANIMACIÓN DE LAS TARJETAS CON GSAP
  // =========================================

  useGSAP(() => {

    // Respetar la preferencia de movimiento reducido
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    // Mostrar las tarjetas de forma escalonada
    gsap.fromTo(
      '.info-brunch-tarjeta',
      {
        y: 35,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: seccionRef.current,
          start: 'top 80%',
          once: true
        }
      }
    )

  }, { scope: seccionRef })


  // =========================================
  // 3. ESTRUCTURA DE LA SECCIÓN
  // =========================================

  return (

    <section
      className="info-brunch"
      aria-labelledby="info-brunch-titulo"
      ref={seccionRef}
    >

      <Container>

        {/* TÍTULO PRINCIPAL */}
        <h2 id="info-brunch-titulo">
          Una experiencia para disfrutar
        </h2>


        {/* CONTENEDOR DE TARJETAS */}
        <div className="info-brunch-grid">


          {/* TARJETA 1: HORARIO DE ATENCIÓN */}
          <article className="info-brunch-tarjeta">

            <Icon
              name="clock outline"
              size="big"
              aria-hidden="true"
            />

            <h3>Horario de atención</h3>

            <p>Lunes a domingo</p>

            <p className="info-brunch-destacado">
              8:00 a. m. - 3:00 p. m.
            </p>

          </article>


          {/* TARJETA 2: AMBIENTE ACOGEDOR */}
          <article className="info-brunch-tarjeta">

            <Icon
              name="coffee"
              size="big"
              aria-hidden="true"
            />

            <h3>Ambiente acogedor</h3>

            <p>
              Un espacio cálido y agradable para
              compartir desayunos, café y buenos momentos.
            </p>

          </article>


          {/* TARJETA 3: RESERVA RÁPIDA */}
          <article className="info-brunch-tarjeta">

            <Icon
              name="calendar check outline"
              size="big"
              aria-hidden="true"
            />

            <h3>Reserva rápida</h3>

            <p>
              Asegura tu mesa con anticipación
              y disfruta de una experiencia
              especial sin complicaciones.
            </p>

          </article>

        </div>

      </Container>

    </section>
  )
}

export default InfoBrunch
