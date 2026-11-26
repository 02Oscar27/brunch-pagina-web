
import { useEffect, useRef, useState } from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import PlatoCard from './PlatoCard.jsx'
import { platos } from '../data/platos.js'

import './PlatosDestacados.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Espacio entre tarjetas.
const ESPACIO = 24

// Tiempo entre movimientos automáticos.
const TIEMPO_AUTOMATICO = 4000

// Duración del desplazamiento del carrusel.
const DURACION_TRANSICION = 550

function PlatosDestacados() {
  // Referencias.
  const seccionRef = useRef(null)
  const ventanaRef = useRef(null)
  const moviendoRef = useRef(false)

  // Datos generales.
  const total = platos.length

  // El carrusel comienza en la copia central.
  const [indice, setIndice] = useState(total)

  // Cantidad de tarjetas visibles.
  const [cardsPorVista, setCardsPorVista] = useState(3)

  // Ancho disponible para el carrusel.
  const [anchoVentana, setAnchoVentana] = useState(0)

  // Control de transición.
  const [transicion, setTransicion] = useState(true)

  // Estados de interacción.
  const [interactuando, setInteractuando] = useState(false)
  const [platoVolteado, setPlatoVolteado] = useState(null)

  // Preferencia de accesibilidad.
  const [movimientoReducido, setMovimientoReducido] = useState(false)

  // Tres copias para conseguir el efecto infinito.
  const pista = [...platos, ...platos, ...platos]

  // Adaptar la cantidad de tarjetas según el tamaño de pantalla.
  useEffect(() => {
    const actualizarVista = () => {
      const anchoPantalla = window.innerWidth

      if (anchoPantalla <= 767) {
        setCardsPorVista(1)
      } else if (anchoPantalla <= 1024) {
        setCardsPorVista(2)
      } else {
        setCardsPorVista(3)
      }

      if (ventanaRef.current) {
        setAnchoVentana(ventanaRef.current.clientWidth)
      }
    }

    actualizarVista()

    const observador = new ResizeObserver(actualizarVista)

    if (ventanaRef.current) {
      observador.observe(ventanaRef.current)
    }

    window.addEventListener('resize', actualizarVista)

    return () => {
      observador.disconnect()
      window.removeEventListener('resize', actualizarVista)
    }
  }, [])

  // Detectar si el usuario prefiere movimiento reducido.
  useEffect(() => {
    const consulta = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const actualizarPreferencia = () => {
      setMovimientoReducido(consulta.matches)
    }

    actualizarPreferencia()

    consulta.addEventListener('change', actualizarPreferencia)

    return () => {
      consulta.removeEventListener('change', actualizarPreferencia)
    }
  }, [])

  // Animación de entrada de la sección.
  useGSAP(
    () => {
      if (
        window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches
      ) {
        return
      }

      gsap.fromTo(
        '.carrusel-marco',
        {
          y: 40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: seccionRef.current,
            start: 'top 80%',
            once: true
          }
        }
      )
    },
    { scope: seccionRef }
  )

  // Calcular el ancho de cada tarjeta.
  const anchoTarjeta =
    anchoVentana > 0
      ? (
          anchoVentana -
          ESPACIO * (cardsPorVista - 1)
        ) / cardsPorVista
      : 0

  // Distancia entre el inicio de una tarjeta y la siguiente.
  const distancia = anchoTarjeta + ESPACIO

  // Efecto 3D de las tarjetas.
  useGSAP(
    () => {
      if (!ventanaRef.current) return

      const items = gsap.utils.toArray(
        '.plato-destacado',
        ventanaRef.current
      )

      // Con una sola tarjeta visible, el efecto 3D agrandaba la tarjeta
      // y la ventana del carrusel recortaba el nombre y el precio.
      // En celulares mantenemos el desplazamiento y el giro de la tarjeta,
      // pero no la inclinación ni el zoom de profundidad.
      if (movimientoReducido || cardsPorVista === 1) {
        gsap.set(items, {
          rotateY: 0,
          z: 0,
          scale: 1
        })
        return
      }

      // Tarjeta de referencia:
      // 1 visible: primera tarjeta.
      // 2 visibles: segunda tarjeta.
      // 3 visibles: tarjeta central.
      const currentIndex =
        indice + Math.floor(cardsPorVista / 2)

      items.forEach((item) => {
        const itemIndex = Number(item.dataset.carouselIndex)
        const offset = itemIndex - currentIndex

        gsap.to(item, {
          rotateY: offset * -30,
          z: offset === 0 ? 50 : -Math.abs(offset) * 30,
          scale: offset === 0 ? 1.2 : 0.85,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      })
    },
    {
      scope: seccionRef,
      dependencies: [
        indice,
        cardsPorVista,
        movimientoReducido,
        anchoVentana
      ],
      revertOnUpdate: true
    }
  )

  // Navegación manual.
  const mover = (direccion) => {
    if (
      moviendoRef.current ||
      !transicion ||
      anchoTarjeta <= 0
    ) {
      return
    }

    moviendoRef.current = true
    setPlatoVolteado(null)

    setIndice((anterior) => anterior + direccion)
  }

  // Movimiento automático.
  useEffect(() => {
    if (
      interactuando ||
      platoVolteado !== null ||
      movimientoReducido ||
      !transicion ||
      anchoTarjeta <= 0
    ) {
      return
    }

    const intervalo = window.setInterval(() => {
      if (!moviendoRef.current) {
        moviendoRef.current = true
        setIndice((anterior) => anterior + 1)
      }
    }, TIEMPO_AUTOMATICO)

    return () => {
      window.clearInterval(intervalo)
    }
  }, [
    interactuando,
    platoVolteado,
    movimientoReducido,
    transicion,
    anchoTarjeta
  ])

  // Reajustar la posición cuando se llega a los extremos de las copias.
  const finalizarMovimiento = (evento) => {
    if (
      evento.target !== evento.currentTarget ||
      evento.propertyName !== 'transform'
    ) {
      return
    }

    moviendoRef.current = false

    // Llegada a la tercera copia.
    if (indice >= total * 2) {
      setTransicion(false)
      setIndice((actual) => actual - total)
    }
    // Llegada a la primera copia.
    else if (indice < total) {
      setTransicion(false)
      setIndice((actual) => actual + total)
    }
  }

  // Restablecer la transición después del reajuste invisible.
  useEffect(() => {
    if (transicion) return

    let segundoFrame

    const primerFrame = requestAnimationFrame(() => {
      segundoFrame = requestAnimationFrame(() => {
        setTransicion(true)
      })
    })

    return () => {
      cancelAnimationFrame(primerFrame)

      if (segundoFrame !== undefined) {
        cancelAnimationFrame(segundoFrame)
      }
    }
  }, [transicion])

  // Girar una tarjeta para mostrar su descripción.
  const girarPlato = (id) => {
    setPlatoVolteado((actual) =>
      actual === id ? null : id
    )
  }

  return (
    <section
      className="platos-destacados"
      ref={seccionRef}
    >
      <Container>
        <h2>Platos destacados</h2>

        <div
          className="platos-decoracion"
          aria-hidden="true"
        >
          <span className="linea-decoracion" />
          <Icon name="leaf" />
          <span className="linea-decoracion" />
        </div>

        <div
          className="carrusel-marco"
          onMouseEnter={() => setInteractuando(true)}
          onMouseLeave={() => setInteractuando(false)}
          onFocusCapture={() => setInteractuando(true)}
          onBlurCapture={(evento) => {
            if (
              !evento.currentTarget.contains(
                evento.relatedTarget
              )
            ) {
              setInteractuando(false)
            }
          }}
        >
          {/* Flecha izquierda */}
          <Button
            type="button"
            icon
            className="flecha-carrusel flecha-izquierda"
            aria-label="Ver plato anterior"
            onClick={() => mover(-1)}
          >
            <Icon name="angle left" />
          </Button>

          {/* Ventana del carrusel */}
          <div
            className="carrusel-ventana"
            ref={ventanaRef}
          >
            {/* Pista deslizante */}
            <div
              className="carrusel-pista"
              onTransitionEnd={finalizarMovimiento}
              style={{
                gap: `${ESPACIO}px`,
                transform: `translate3d(${
                  -indice * distancia
                }px, 0, 0)`,
                transition:
                  transicion && anchoTarjeta > 0
                    ? `transform ${DURACION_TRANSICION}ms ease`
                    : 'none'
              }}
            >
              {pista.map((plato, posicion) => (
                <div
                  key={`${posicion}-${plato.id}`}
                  className="plato-destacado"
                  data-carousel-index={posicion}
                  style={{
                    width:
                      anchoTarjeta > 0
                        ? `${anchoTarjeta}px`
                        : '100%'
                  }}
                >
                  <PlatoCard
                    nombre={plato.nombre}
                    precio={plato.precio}
                    imagen={plato.imagen}
                    descripcion={plato.descripcion}
                    volteada={platoVolteado === plato.id}
                    onGirar={() => girarPlato(plato.id)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Flecha derecha */}
          <Button
            type="button"
            icon
            className="flecha-carrusel flecha-derecha"
            aria-label="Ver plato siguiente"
            onClick={() => mover(1)}
          >
            <Icon name="angle right" />
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default PlatosDestacados
