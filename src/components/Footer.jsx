
import { useRef } from 'react'
import { Container, Icon } from 'semantic-ui-react'

// Navegación de React Router
import { useLocation } from 'react-router-dom'

// Animaciones GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Estilos
import './Footer.css'

// Registrar los plugins
gsap.registerPlugin(useGSAP, ScrollTrigger)

function Footer() {

  // =========================================
  // 1. REFERENCIAS Y NAVEGACIÓN
  // =========================================

  // Referencia al Footer
  const footerRef = useRef(null)

  // Detectar la página actual
  const { pathname } = useLocation()


  // =========================================
  // 2. ANIMACIONES CON GSAP
  // =========================================

  useGSAP(() => {

    // Respetar la preferencia de movimiento reducido
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    // Crear una secuencia de animaciones
    const timeline = gsap.timeline({

      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        once: true
      }

    })


    // =========================================
    // 3. ANIMACIÓN DEL LOGO
    // =========================================

    timeline.fromTo(
      '.footer-logo',
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
      }
    )


    // =========================================
    // 4. ANIMACIÓN DE REDES SOCIALES
    // =========================================

    .fromTo(
      '.footer-redes .icon',
      {
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      },
      '-=0.3'
    )


    // =========================================
    // 5. ANIMACIÓN DEL CONTACTO
    // =========================================

    .fromTo(
      '.footer-contacto',
      {
        y: 15,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.2'
    )

  }, {
    scope: footerRef,
    dependencies: [pathname],
    revertOnUpdate: true
  })


  // =========================================
  // 6. ESTRUCTURA DEL FOOTER
  // =========================================

  return (

    <footer
      className="footer-brunch"
      ref={footerRef}
    >

      <Container>

        <div className="footer-contenido">

          {/* LOGO DEL RESTAURANTE */}
          <h3 className="footer-logo">
            Brunch<span>.</span>
          </h3>


          {/* REDES SOCIALES */}
          <div
            className="footer-redes"
            aria-label="Redes sociales de Brunch"
          >

            <Icon name="instagram" size="large" />
            <Icon name="facebook" size="large" />
            <Icon name="whatsapp" size="large" />

          </div>


          {/* INFORMACIÓN DE CONTACTO */}
          <p className="footer-contacto">
            Contacto | © 2026 Brunch
          </p>

        </div>

      </Container>

    </footer>

  )
}

export default Footer
