import { useRef } from 'react'


import { Container, Grid, Button } from 'semantic-ui-react'


import { Link } from 'react-router-dom'


import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


import brunchPrincipal from '../assets/images/brunch-principal.png'


import './Bienvenida.css'


/* =========================================
   2. CONFIGURACIÓN DE GSAP
========================================= */

// Registrar el plugin de React
gsap.registerPlugin(useGSAP)


/* =========================================
   3. COMPONENTE BIENVENIDA
========================================= */

function Bienvenida() {

  // Referencia a la sección principal
  const seccionRef = useRef(null)


  /* =========================================
     4. ANIMACIONES DE ENTRADA
  ========================================= */

  useGSAP(() => {

    // Respetar la preferencia de movimiento reducido
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    // Crear una secuencia de animaciones
    const tl = gsap.timeline()

    // 1. El título entra desde la izquierda
    tl.fromTo(
      '.titulo-bienvenida',
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }
    )

    // 2. La fotografía entra desde la derecha
    .fromTo(
      '.imagen-principal',
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      },
      '-=0.6'
    )

  }, { scope: seccionRef })


  /* =========================================
     5. ESTRUCTURA DE BIENVENIDA
  ========================================= */

  return (

    <section
      className="seccion-bienvenida"
      ref={seccionRef}
    >

      <Container fluid>

        <Grid columns={2} stackable>

          {/* =================================
              COLUMNA IZQUIERDA: INFORMACIÓN
          ================================= */}

          <Grid.Column>

            <div className="bienvenida-texto">

              {/* Título principal */}
              <h1 className="titulo-bienvenida">
                Disfruta un brunch
                <span>diferente.</span>
              </h1>

              {/* Descripción */}
              <p>
                Un espacio para disfrutar desayunos,
                café y buenos momentos.
              </p>

              {/* Botones de navegación */}
              <div className="bienvenida-botones">

                <Button
                  as={Link}
                  to="/menu"
                  className="boton-menu"
                >
                  Ver menú
                </Button>

                <Button
                  as={Link}
                  to="/reservas"
                  className="boton-reserva"
                >
                  Reservar
                </Button>

              </div>

            </div>

          </Grid.Column>


          {/* =================================
              COLUMNA DERECHA: FOTOGRAFÍA
          ================================= */}

          <Grid.Column>

            <div className="bienvenida-imagen">

              <img
                src={brunchPrincipal}
                alt="Mesa con diferentes platos de brunch"
                className="imagen-principal"
              />

            </div>

          </Grid.Column>

        </Grid>

      </Container>

    </section>

  )
}

export default Bienvenida
