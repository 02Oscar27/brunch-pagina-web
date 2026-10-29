
import { useRef } from 'react'

// Animaciones GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Estilos del componente
import './AmbienteBrunch.css'

// Registrar los plugins
gsap.registerPlugin(useGSAP, ScrollTrigger)

function AmbienteBrunch() {

  // Referencia a la sección fotográfica
  const seccionRef = useRef(null)

  // =========================================
  // 1. ANIMACIÓN DE ENTRADA CON GSAP
  // =========================================

  useGSAP(() => {

    // Respetar la preferencia de movimiento reducido
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    // Animar el contenido al llegar a la sección
    gsap.fromTo(
      '.ambiente-brunch-contenido',
      {
        y: 45,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: seccionRef.current,
          start: 'top 75%',
          once: true
        }
      }
    )

  }, { scope: seccionRef })


  // =========================================
  // 2. ESTRUCTURA DEL COMPONENTE
  // =========================================

  return (
    <section
      className="ambiente-brunch"
      aria-labelledby="ambiente-titulo"
      ref={seccionRef}
    >

      <div className="ambiente-brunch-contenido">

        <p className="ambiente-brunch-etiqueta">
          VIVE LA EXPERIENCIA BRUNCH
        </p>

        <h2 id="ambiente-titulo">
          Pequeños detalles,
          <span> grandes momentos.</span>
        </h2>

        <p className="ambiente-brunch-descripcion">
          Más que un desayuno, un espacio acogedor
          para compartir, disfrutar y crear recuerdos.
        </p>

      </div>

    </section>
  )
}

export default AmbienteBrunch
