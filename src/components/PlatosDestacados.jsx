
import { useEffect, useRef, useState } from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'

// Animaciones GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Componentes y datos del proyecto
import PlatoCard from './PlatoCard.jsx'
import { platos } from '../data/platos.js'

// Estilos
import './PlatosDestacados.css'

// 1. CONFIGURACIÓN GENERAL

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Espacio entre las tarjetas (px)
const ESPACIO = 24

// Tiempo entre movimientos automáticos (ms)
const TIEMPO_AUTOMATICO = 4000

// Duración del desplazamiento (ms)
const DURACION_TRANSICION = 550


function PlatosDestacados() {

  // 2. REFERENCIAS
  const seccionRef = useRef(null)
  const ventanaRef = useRef(null)

  // Evita iniciar otro movimiento mientras
  // el carrusel está cambiando de posición.
  const moviendoRef = useRef(false)
  // 3. ESTADOS DEL CARRUSEL

  const total = platos.length

  // Comenzar en la copia central.
  const [indice, setIndice] = useState(total)

  // Cantidad de tarjetas visibles.
  const [cardsPorVista, setCardsPorVista] = useState(3)

  // Ancho disponible para mostrar las tarjetas.
  const [anchoVentana, setAnchoVentana] = useState(0)

  // Control de la transición.
  const [transicion, setTransicion] = useState(true)

  // Detectar interacción del usuario.
  const [interactuando, setInteractuando] = useState(false)

  // Preferencia de accesibilidad.
  const [movimientoReducido, setMovimientoReducido] =
    useState(false)

  // Identificar el plato cuya descripción está abierta.
  const [platoVolteado, setPlatoVolteado] = useState(null)
  // 4. PLATOS DEL CARRUSEL INFINITO

  // Repetir los platos tres veces permite
  // avanzar y retroceder sin cortes visibles.
  const pista = [...platos, ...platos, ...platos]

  // 5. ADAPTACIÓN RESPONSIVE

  useEffect(() => {

    const actualizarVista = () => {

      const anchoPantalla = window.innerWidth

      // Celulares: una tarjeta
      if (anchoPantalla <= 767) {
        setCardsPorVista(1)

      // Tabletas: dos tarjetas
      } else if (anchoPantalla <= 1024) {
        setCardsPorVista(2)

      // Computadores: tres tarjetas
      } else {
        setCardsPorVista(3)
      }

      // Obtener el ancho del carrusel.
      if (ventanaRef.current) {
        setAnchoVentana(ventanaRef.current.clientWidth)
      }

    }

    actualizarVista()

    // Observar cambios en el tamaño del contenedor.
    const observador = new ResizeObserver(actualizarVista)

    if (ventanaRef.current) {
      observador.observe(ventanaRef.current)
    }

    window.addEventListener('resize', actualizarVista)

    // Limpiar eventos al desmontar el componente.
    return () => {
      observador.disconnect()
      window.removeEventListener('resize', actualizarVista)
    }

  }, [])

  // 6. PREFERENCIA DE MOVIMIENTO REDUCIDO
  useEffect(() => {

    const consulta = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const actualizarPreferencia = () => {
      setMovimientoReducido(consulta.matches)
    }

    actualizarPreferencia()

    consulta.addEventListener(
      'change',
      actualizarPreferencia
    )

    return () => {
      consulta.removeEventListener(
        'change',
        actualizarPreferencia
      )
    }

  }, [])
  // 7. ANIMACIÓN DE ENTRADA CON GSAP

  useGSAP(() => {

    // Evitar la animación cuando el usuario
    // prefiere movimiento reducido.
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

  }, { scope: seccionRef })
  // 8. CALCULAR EL TAMAÑO DE LAS TARJETAS
  const anchoTarjeta = anchoVentana > 0
    ? (
        anchoVentana -
        ESPACIO * (cardsPorVista - 1)
      ) / cardsPorVista
    : 0

  // Distancia entre el inicio de una tarjeta
  // y el inicio de la siguiente.
  const distancia = anchoTarjeta + ESPACIO
  // 9. NAVEGACIÓN MANUAL
  const mover = (direccion) => {

    // No permitir movimientos simultáneos.
    if (
      moviendoRef.current ||
      !transicion ||
      anchoTarjeta <= 0
    ) {
      return
    }

    moviendoRef.current = true

    // Cerrar la descripción si estaba abierta.
    setPlatoVolteado(null)

    // -1: anterior | 1: siguiente
    setIndice((anterior) => anterior + direccion)

  }
  // 10. MOVIMIENTO AUTOMÁTICO

  useEffect(() => {

    // Detener temporalmente el movimiento cuando:
    // - El usuario interactúa con el carrusel.
    // - Una descripción está abierta.
    // - Se prefiere movimiento reducido.
    // - El carrusel está reajustando su posición.
    if (
      interactuando ||
      platoVolteado !== null ||
      movimientoReducido ||
      !transicion ||
      anchoTarjeta <= 0
    ) {
      return
    }

    // Avanzar automáticamente cada cuatro segundos.
    const intervalo = window.setInterval(() => {

      if (!moviendoRef.current) {

        moviendoRef.current = true

        setIndice((anterior) => anterior + 1)

      }

    }, TIEMPO_AUTOMATICO)

    // Evitar intervalos acumulados.
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
  // 11. REINICIO INVISIBLE DEL CARRUSEL

  const finalizarMovimiento = (evento) => {

    // Solo escuchar la transición de la pista.
    if (
      evento.target !== evento.currentTarget ||
      evento.propertyName !== 'transform'
    ) {
      return
    }

    moviendoRef.current = false

    // Si llegamos a la tercera copia,
    // regresar a la posición equivalente
    // de la copia central.
    if (indice >= total * 2) {

      setTransicion(false)
      setIndice((actual) => actual - total)

    // Si llegamos a la primera copia,
    // volver a la posición equivalente
    // de la copia central.
    } else if (indice < total) {

      setTransicion(false)
      setIndice((actual) => actual + total)

    }

  }
  // 12. RESTABLECER LA TRANSICIÓN
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
  // 13. GIRAR UNA TARJETA

  const girarPlato = (id) => {

    setPlatoVolteado((actual) =>
      actual === id ? null : id
    )

  }
  // 14. RENDERIZADO
  return (

    <section
      className="platos-destacados"
      ref={seccionRef}
    >
      <Container>

        <h2>Platos destacados</h2>

        {/* Decoración bajo el título */}
        <div className="platos-decoracion" aria-hidden="true">
          <span className="linea-decoracion" />

          <Icon name="leaf" />

          <span className="linea-decoracion" />

        </div>

        {/* Carrusel y flechas laterales */}
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

          {/* FLECHA IZQUIERDA */}
          <Button
            type="button"
            icon
            className="flecha-carrusel"
            aria-label="Ver plato anterior"
            onClick={() => mover(-1)}
          >
            <Icon name="angle left" />
          </Button>


          {/* VENTANA DEL CARRUSEL */}
          <div
            className="carrusel-ventana"
            ref={ventanaRef}
          >

            {/* PISTA DESLIZANTE */}
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

              {/* TARJETAS */}
              {pista.map((plato, posicion) => (

                <div
                  key={`${posicion}-${plato.id}`}
                  className="plato-destacado"

                  style={{
                    width: anchoTarjeta > 0
                      ? `${anchoTarjeta}px`
                      : '100%'
                  }}
                >

                  <PlatoCard
                    nombre={plato.nombre}
                    precio={plato.precio}
                    imagen={plato.imagen}
                    descripcion={plato.descripcion}

                    volteada={
                      platoVolteado === plato.id
                    }

                    onGirar={() => girarPlato(plato.id)}
                  />

                </div>

              ))}

            </div>

          </div>

          {/* FLECHA DERECHA */}
          <Button
            type="button"
            icon
            className="flecha-carrusel"
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