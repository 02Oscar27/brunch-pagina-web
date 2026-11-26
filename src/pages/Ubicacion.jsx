
import { useRef } from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ClimaBrunch from '../components/ClimaBrunch.jsx'

// Animaciones GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Estilos
import '../components/ubicacion/Ubicacion.css'

// Registrar los plugins de GSAP
gsap.registerPlugin(useGSAP, ScrollTrigger)


// =========================================
// 1. CONFIGURACIÓN DE GOOGLE MAPS
// =========================================

// Ubicación provisional del restaurante
const zonaReferencia = 'Neiva, Huila, Colombia'

// URL para mostrar el mapa en nuestra página
const mapaUrl =
  `https://www.google.com/maps?q=${encodeURIComponent(zonaReferencia)}&output=embed`

// URL para abrir la zona en Google Maps
const googleMapsUrl =
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(zonaReferencia)}`


function Ubicacion() {

  // =========================================
  // 2. REFERENCIA A LA SECCIÓN
  // =========================================

  const seccionRef = useRef(null)


  // =========================================
  // 3. ANIMACIONES CON GSAP
  // =========================================

  useGSAP(() => {

    // Respetar la configuración de movimiento reducido
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return


    // ANIMACIÓN 1: Encabezado
    // Aparece suavemente desde abajo

    gsap.fromTo(
      '.ubicacion-encabezado',
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


    // ANIMACIÓN 2: Información y mapa
    // Se activa cuando el contenido entra en pantalla

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.ubicacion-grid',
        start: 'top 85%',
        once: true
      }
    })


    // Información: entrada desde la izquierda
    timeline.fromTo(
      '.ubicacion-informacion',
      {
        x: -40,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out'
      }
    )


    // Mapa: entrada desde la derecha
    .fromTo(
      '.ubicacion-mapa-contenedor',
      {
        x: 40,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power2.out'
      },
      '-=0.5'
    )

  }, { scope: seccionRef })


  // =========================================
  // 4. ESTRUCTURA DE LA PÁGINA
  // =========================================

  return (

    <section
      className="ubicacion-pagina"
      aria-labelledby="titulo-ubicacion"
      ref={seccionRef}
    >

      <Container>

        {/* =====================================
            ENCABEZADO DE UBICACIÓN
        ===================================== */}

        <div className="ubicacion-encabezado">

          <span className="ubicacion-etiqueta">
            VEN A CONOCERNOS
          </span>

          <h1 id="titulo-ubicacion">
            Encuéntranos
          </h1>

          <p>
            Estamos listos para recibirte y compartir
            desayunos, café y buenos momentos.
          </p>

        </div>


        {/* =====================================
            CONTENIDO PRINCIPAL
        ===================================== */}

        <div className="ubicacion-grid">

          {/* COLUMNA IZQUIERDA: INFORMACIÓN */}
          <div className="ubicacion-informacion">

            <h2>Visítanos en Brunch.</h2>

            <p className="ubicacion-descripcion">
              Disfruta de un espacio acogedor,
              buena comida y una experiencia especial.
            </p>


            {/* DIRECCIÓN */}
            <div className="ubicacion-detalle">

              <Icon
                name="map marker alternate"
                size="large"
                aria-hidden="true"
              />

              <div>

                <h3>Ubicación</h3>

                <p>{zonaReferencia}</p>

                <small>
                  Ubicación de referencia.
                  Dirección exacta por definir.
                </small>

              </div>

            </div>


            {/* HORARIO DE ATENCIÓN */}
            <div className="ubicacion-detalle">

              <Icon
                name="clock outline"
                size="large"
                aria-hidden="true"
              />

              <div>

                <h3>Horario de atención</h3>

                <p>Lunes a domingo</p>

                <p>8:00 a. m. – 3:00 p. m.</p>

              </div>

            </div>


            {/* RESERVAS */}
            <div className="ubicacion-detalle">

              <Icon
                name="calendar check outline"
                size="large"
                aria-hidden="true"
              />

              <div>

                <h3>Reserva tu mesa</h3>

                <p>
                  Planea tu visita con anticipación.
                </p>

              </div>

            </div>


            {/* BOTÓN DE RESERVAS */}
            <Button
              as={Link}
              to="/reservas"
              className="ubicacion-boton"
            >
              Reservar mesa
            </Button>

          </div>


          {/* COLUMNA DERECHA: GOOGLE MAPS */}
          <div className="ubicacion-mapa-contenedor">

            <iframe
              title="Mapa de referencia de Neiva, Huila"
              src={mapaUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ubicacion-enlace-mapa"
            >

              Ver zona en Google Maps

              <Icon
                name="external alternate"
                aria-hidden="true"
              />

            </a>

          </div>

        </div>

        <ClimaBrunch />

      </Container>

    </section>
  )
}

export default Ubicacion

