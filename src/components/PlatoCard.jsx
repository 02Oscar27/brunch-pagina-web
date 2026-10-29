import { Card, Image } from 'semantic-ui-react'

function PlatoCard({
  nombre,
  precio,
  imagen,
  descripcion,
  volteada = false,
  onGirar
}) {

  // =========================================
  // 1. FORMATEAR EL PRECIO
  // =========================================

  const precioFormateado = new Intl.NumberFormat(
    'es-CO',
    {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }
  ).format(precio)


  // =========================================
  // 2. PERMITIR EL GIRO CON EL TECLADO
  // =========================================

  const manejarTeclado = (evento) => {

    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault()
      onGirar?.()
    }

  }


  // =========================================
  // 3. RENDERIZAR LA TARJETA
  // =========================================

  return (

    <Card
      fluid
      className={`flip-card ${volteada ? 'volteada' : ''}`}
      role="button"
      tabIndex={0}
      aria-pressed={volteada}
      aria-label={`${nombre}. ${
        volteada ? 'Volver a la imagen' : 'Ver descripción'
      }`}
      onClick={onGirar}
      onKeyDown={manejarTeclado}
    >

      <div className="flip-card-inner">

        {/* =====================================
            4. PARTE DELANTERA
        ===================================== */}

        <div
          className="flip-card-front"
          aria-hidden={volteada}
        >

          {/* Imagen del plato */}
          <div className="plato-imagen-contenedor">

            <Image
              src={imagen}
              alt={nombre}
              className="imagen-plato"
            />

          </div>

          {/* Información principal */}
          <Card.Content>

            <Card.Header>
              {nombre}
            </Card.Header>

            <Card.Description>
              {precioFormateado}
            </Card.Description>

          </Card.Content>

        </div>


        {/* =====================================
            5. PARTE POSTERIOR
        ===================================== */}

        <div
          className="flip-card-back"
          aria-hidden={!volteada}
        >

          <h3>{nombre}</h3>

          <p>{descripcion}</p>

          <span className="precio-plato">
            {precioFormateado}
          </span>

          <span className="volver-plato">
            Vuelve a seleccionar para regresar
          </span>

        </div>

      </div>

    </Card>

  )
}

export default PlatoCard
