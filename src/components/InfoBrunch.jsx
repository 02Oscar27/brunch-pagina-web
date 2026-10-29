
import { Container, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import './InfoBrunch.css'

function InfoBrunch() {

  return (
    <section className="info-brunch" aria-labelledby="info-brunch-titulo">

      <Container>

        <h2 id="info-brunch-titulo">
          Una experiencia para disfrutar
        </h2>

        <div className="info-brunch-grid">

          {/* TARJETA 1: HORARIO */}
          <article className="info-brunch-tarjeta">

            <Icon name="clock outline" size="big" />

            <h3>Horario de atención</h3>

            <p>Lunes a domingo</p>

            <p className="info-brunch-destacado">
              8:00 a. m. - 3:00 p. m.
            </p>

          </article>


          {/* TARJETA 2: AMBIENTE */}
          <article className="info-brunch-tarjeta">

            <Icon name="coffee" size="big" />

            <h3>Ambiente acogedor</h3>

            <p>
              Un espacio cálido y agradable para
              compartir desayunos, café y buenos momentos.
            </p>

          </article>


          {/* TARJETA 3: RESERVAS */}
            <article className="info-brunch-tarjeta">

            <Icon name="calendar check outline" size="big" />

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
