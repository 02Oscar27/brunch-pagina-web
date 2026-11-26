
import { useEffect, useRef, useState } from 'react'
import { Icon } from 'semantic-ui-react'
import { consultarClima } from '../services/climaService.js'

// Animaciones GSAP
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Estilos
import './ClimaBrunch.css'

// Registrar los plugins
gsap.registerPlugin(useGSAP, ScrollTrigger)


// La consulta HTTP y validación del JSON están separadas en climaService.js.


function ClimaBrunch() {

  // =========================================
  // 2. ESTADOS DE REACT
  // =========================================

  const [clima, setClima] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  // Referencia de GSAP
  const seccionRef = useRef(null)


  // =========================================
  // 3. CONSUMIR LA API
  // =========================================

  useEffect(() => {

    const controlador = new AbortController()

    const obtenerClima = async () => {

      try {

        // El servicio devuelve únicamente los datos que necesita la interfaz.
        const datosClima = await consultarClima(controlador.signal)

        setClima(datosClima)

      } catch (errorConsulta) {

        // Ignorar una solicitud cancelada
        if (errorConsulta.name !== 'AbortError') {

          console.error(errorConsulta)

          setError(
            'No se pudo consultar el clima en este momento.'
          )

        }

      } finally {

        if (!controlador.signal.aborted) {
          setCargando(false)
        }

      }

    }

    obtenerClima()

    // Cancelar la solicitud al desmontar el componente
    return () => controlador.abort()

  }, [])


  // =========================================
  // 4. ANIMACIÓN GSAP
  // =========================================

  useGSAP(() => {

    const reducirMovimiento = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducirMovimiento) return

    gsap.fromTo(
      seccionRef.current,
      {
        y: 35,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',

        scrollTrigger: {
          trigger: seccionRef.current,
          start: 'top 90%',
          once: true
        }
      }
    )

  }, { scope: seccionRef })


  // =========================================
  // 5. INTERFAZ DEL COMPONENTE
  // =========================================

  return (

    <section
      className="clima-brunch"
      ref={seccionRef}
      aria-labelledby="clima-brunch-titulo"
    >

      <div className="clima-brunch-encabezado">

        <Icon name="sun" size="big" />

        <div>

          <h2 id="clima-brunch-titulo">
            ¿Cómo está el clima en Neiva?
          </h2>

          <p>
            Consulta las condiciones del clima
            antes de visitarnos.
          </p>

        </div>

      </div>


      {/* MENSAJE DE CARGA */}
      {cargando && (

        <p className="clima-brunch-mensaje" role="status">
          Consultando el clima...
        </p>

      )}


      {/* MENSAJE DE ERROR */}
      {error && (

        <p className="clima-brunch-mensaje" role="alert">
          {error}
        </p>

      )}


      {/* RESULTADOS DE LA API */}
      {clima && (

        <div className="clima-brunch-datos">

          {/* TEMPERATURA */}
          <div className="clima-brunch-dato">

            <Icon name="thermometer half" size="large" />

            <strong>
              {clima.temperatura.toFixed(1)} °C
            </strong>

            <span>Temperatura</span>

          </div>


          {/* HUMEDAD */}
          <div className="clima-brunch-dato">

            <Icon name="tint" size="large" />

            <strong>
              {Math.round(clima.humedad)} %
            </strong>

            <span>Humedad relativa</span>

          </div>

        </div>

      )}


      {/* ATRIBUCIÓN DE LA FUENTE */}
      <p className="clima-brunch-fuente">

        Datos meteorológicos estimados por{' '}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open-Meteo
        </a>

      </p>

    </section>

  )
}

export default ClimaBrunch
