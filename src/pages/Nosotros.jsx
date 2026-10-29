import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Icon, Button } from 'semantic-ui-react'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import brunchImg from '../assets/images/brunch-principal.png'
import pancakesImg from '../assets/images/pancakes.png'
import '../components/nosotros/Nosotros.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const RECORRIDO = [
  {
    anio: '2022',
    titulo: 'La idea',
    texto: 'Soñamos con un lugar donde desayunar fuera un plan, no una carrera.'
  },
  {
    anio: '2023',
    titulo: 'Abrimos la puerta',
    texto: 'Abrimos en Neiva con pocas mesas, café recién hecho y mucho cariño.'
  },
  {
    anio: '2024',
    titulo: 'Menú de la casa',
    texto: 'Nacieron los pancakes, los waffles y los huevos benedictinos que hoy nos representan.'
  },
  {
    anio: '2026',
    titulo: 'Reservas en línea',
    texto: 'Ahora puedes apartar tu mesa desde esta página en pocos pasos.'
  }
]

const VALORES = [
  {
    id: 'calidad',
    icono: 'leaf',
    titulo: 'Calidad',
    texto: 'Elegimos ingredientes frescos y preparamos cada plato al momento.'
  },
  {
    id: 'experiencia',
    icono: 'coffee',
    titulo: 'Experiencia',
    texto: 'Cuidamos cada detalle de tu visita, del saludo a la última taza.'
  },
  {
    id: 'cercania',
    icono: 'heart outline',
    titulo: 'Cercanía',
    texto: 'Te atendemos como en casa: con tu nombre y sin afán.'
  }
]

function Nosotros() {

  const paginaRef = useRef(null)

  useGSAP(() => {

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const entrada = (elementos, desde, disparador, extra = {}) => {
      gsap.fromTo(
        elementos,
        { opacity: 0, ...desde },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: disparador,
            start: 'top 85%',
            once: true
          },
          ...extra
        }
      )
    }

    entrada('.nosotros-encabezado', { y: 30 }, '.nosotros-encabezado')
    entrada('.nosotros-imagen', { x: -80 }, '.nosotros-historia-grid')
    entrada('.nosotros-texto', { x: 80 }, '.nosotros-historia-grid')
    entrada('.nosotros-hito', { y: 40 }, '.nosotros-recorrido-lista', { stagger: 0.18 })
    entrada('.nosotros-tarjeta', { y: 40 }, '.nosotros-tarjetas', { stagger: 0.2 })
    entrada('.nosotros-valor', { y: 40 }, '.nosotros-valores-lista', { stagger: 0.18 })
    entrada('.nosotros-cta-contenido', { y: 30 }, '.nosotros-cta')

  }, { scope: paginaRef })

  return (
    <div className="nosotros-pagina" ref={paginaRef}>

      <section className="nosotros-seccion nosotros-historia">
        <Container>

          <header className="nosotros-encabezado">
            <h1>Sobre nosotros</h1>
            <p>Un desayunadero en Neiva donde el brunch se disfruta con calma.</p>
          </header>

          <Grid columns={2} stackable verticalAlign="middle" className="nosotros-historia-grid">

            <Grid.Column>
              <div className="nosotros-imagen">
                <img
                  className="nosotros-foto-principal"
                  src={brunchImg}
                  alt="Mesa del local con platos de brunch y bebidas"
                />
                <img
                  className="nosotros-foto-secundaria"
                  src={pancakesImg}
                  alt=""
                />
              </div>
            </Grid.Column>

            <Grid.Column>
              <div className="nosotros-texto">
                <h2>Historia del negocio</h2>
                <p>
                  Brunch nació en Neiva con una idea sencilla: que desayunar no
                  fuera una carrera antes del trabajo. Empezamos con pocas mesas,
                  café recién hecho y una receta de pancakes que probamos más
                  veces de las que podemos contar.
                </p>
                <p>
                  Hoy seguimos cocinando igual: con ingredientes frescos,
                  porciones generosas y un ambiente donde se puede conversar sin
                  afán. Nuestra propuesta es una mesa para quedarse, desde el
                  primer café hasta el último bocado.
                </p>
              </div>
            </Grid.Column>

          </Grid>

        </Container>
      </section>

      <section className="nosotros-seccion nosotros-recorrido">
        <Container>

          <h2 className="nosotros-titulo-seccion">Nuestro recorrido</h2>

          <ol className="nosotros-recorrido-lista">
            {RECORRIDO.map((hito) => (
              <li className="nosotros-hito" key={hito.anio}>
                <span className="nosotros-hito-anio">{hito.anio}</span>
                <h3>{hito.titulo}</h3>
                <p>{hito.texto}</p>
              </li>
            ))}
          </ol>

        </Container>
      </section>

      <section className="nosotros-seccion nosotros-mision-vision">
        <Container>

          <div className="nosotros-tarjetas">

            <article className="nosotros-tarjeta">
              <div className="nosotros-tarjeta-icono">
                <Icon name="bullseye" />
              </div>
              <h2>Nuestra misión</h2>
              <p className="nosotros-tarjeta-lead">
                Ofrecer una experiencia de brunch cercana, fresca y de calidad.
              </p>
              <p className="nosotros-tarjeta-apoyo">
                Cada plato sale de nuestra cocina pensado para que disfrutes la
                mañana, sin prisa y con buena compañía.
              </p>
            </article>

            <article className="nosotros-tarjeta">
              <div className="nosotros-tarjeta-icono">
                <Icon name="eye" />
              </div>
              <h2>Nuestra visión</h2>
              <p className="nosotros-tarjeta-lead">
                Ser un referente local por nuestra propuesta gastronómica y servicio.
              </p>
              <p className="nosotros-tarjeta-apoyo">
                Queremos que en Neiva se piense en Brunch cuando se trate de
                empezar bien el día.
              </p>
            </article>

          </div>

        </Container>
      </section>

      <section className="nosotros-seccion nosotros-valores">
        <Container>

          <h2 className="nosotros-titulo-seccion">Nuestros valores</h2>

          <ul className="nosotros-valores-lista">
            {VALORES.map((valor) => (
              <li className="nosotros-valor" key={valor.id}>
                <div className="nosotros-valor-icono">
                  <Icon name={valor.icono} />
                </div>
                <h3>{valor.titulo}</h3>
                <p>{valor.texto}</p>
              </li>
            ))}
          </ul>

        </Container>
      </section>

      <section className="nosotros-seccion nosotros-cta">
        <Container>

          <div className="nosotros-cta-contenido">
            <h2>¿Listo para probarlo?</h2>
            <p>Reserva tu mesa y empieza el día con calma.</p>
            <Button as={Link} to="/reservas" className="nosotros-boton">
              Reservar mesa
            </Button>
          </div>

        </Container>
      </section>

    </div>
  )
}

export default Nosotros