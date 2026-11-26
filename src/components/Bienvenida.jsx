
import { useRef } from 'react'

import { Container, Grid, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import brunchPrincipal from '../assets/images/brunch-principal.png'

import './Bienvenida.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Bienvenida() {
  const seccionRef = useRef(null)

  useGSAP(() => {
    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    const contexto = seccionRef.current
    if (!contexto) return

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' }
    })

    // Animación del título palabra por palabra.
    tl.fromTo(
      '.titulo-bienvenida .palabra-titulo',
      { y: 48, opacity: 0, rotateX: -35 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.85,
        stagger: 0.11,
        ease: 'back.out(1.25)'
      }
    )
      // Entrada de la descripción.
      .fromTo(
        '.bienvenida-descripcion',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.38'
      )
      // Entrada de los botones.
      .fromTo(
        '.bienvenida-botones .ui.button',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.12 },
        '-=0.3'
      )
      // Revelado de la fotografía.
      .fromTo(
        '.imagen-principal',
        {
          clipPath: 'inset(0 0 0 100% round 14px)',
          scale: 1.12
        },
        {
          clipPath: 'inset(0 0 0 0% round 14px)',
          scale: 1,
          duration: 1.25,
          ease: 'power4.inOut'
        },
        '-=0.95'
      )

    // Movimiento sutil de la imagen al desplazarse.
    gsap.to('.imagen-principal', {
      yPercent: 5,
      ease: 'none',
      scrollTrigger: {
        trigger: contexto,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7
      }
    })

  }, { scope: seccionRef })

  return (
    <section className="seccion-bienvenida" ref={seccionRef}>
      <Container fluid>
        <Grid columns={2} stackable>
          <Grid.Column>
            <div className="bienvenida-texto">
              <p className="bienvenida-eyebrow">
                UN MOMENTO PARA DISFRUTAR
              </p>

              <h1
                className="titulo-bienvenida"
                aria-label="Disfruta un brunch diferente."
              >
                <span className="linea-titulo" aria-hidden="true">
                  <span className="palabra-titulo">Disfruta</span>{' '}
                  <span className="palabra-titulo">un</span>
                </span>

                <span
                  className="linea-titulo linea-titulo-acento"
                  aria-hidden="true"
                >
                  <span className="palabra-titulo">brunch</span>{' '}
                  <span className="palabra-titulo">diferente.</span>
                </span>
              </h1>

              <p className="bienvenida-descripcion">
                Un espacio para disfrutar desayunos, café y buenos momentos.
              </p>

              <div className="bienvenida-botones">
                <Button as={Link} to="/menu" className="boton-menu">
                  Ver menú
                </Button>

                <Button as={Link} to="/reservas" className="boton-reserva">
                  Reservar
                </Button>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column>
            <div className="bienvenida-imagen">
              <img
                src={brunchPrincipal}
                alt="Mesa con diferentes platos de brunch"
                className="imagen-principal"
              />

              <span className="imagen-sello" aria-hidden="true">
                <span>BRUNCH</span>
                <span> & coffee</span>
              </span>
            </div>
          </Grid.Column>
        </Grid>
      </Container>
    </section>
  )
}

export default Bienvenida
