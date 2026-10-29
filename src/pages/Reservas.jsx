import { useState } from 'react'
import { Container, Grid, Form, Button, Icon } from 'semantic-ui-react'

import brunchImg from '../assets/images/brunch-principal.png'
import '../components/reservas/Reservas.css'

const HORA_APERTURA = '08:00'
const HORA_ULTIMA_RESERVA = '15:00'
const MAX_PERSONAS = 10
const MAX_DIAS_ANTICIPACION = 60
const MAX_OBSERVACIONES = 200

const CAMPOS_OBLIGATORIOS = [
  'nombre',
  'correo',
  'telefono',
  'fecha',
  'hora',
  'personas'
]

const VALORES_INICIALES = {
  nombre: '',
  correo: '',
  telefono: '',
  fecha: '',
  hora: '',
  personas: '',
  observaciones: ''
}

const dosDigitos = (numero) => String(numero).padStart(2, '0')

const aFechaISO = (fecha) =>
  `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`

const fechaLimite = (desde) => {
  const limite = new Date(desde)
  limite.setDate(limite.getDate() + MAX_DIAS_ANTICIPACION)
  return aFechaISO(limite)
}

const horaActual = (ahora) =>
  `${dosDigitos(ahora.getHours())}:${dosDigitos(ahora.getMinutes())}`

const FECHA_MINIMA = aFechaISO(new Date())
const FECHA_MAXIMA = fechaLimite(new Date())

const formatoHora = (hhmm) => {
  const [horas, minutos] = hhmm.split(':').map(Number)

  return new Date(2000, 0, 1, horas, minutos).toLocaleTimeString('es-CO', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

const formatoFecha = (iso) => {
  const [anio, mes, dia] = iso.split('-').map(Number)

  return new Date(anio, mes - 1, dia).toLocaleDateString('es-CO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function validarReserva(valores, ahora) {
  const errores = {}

  const nombre = valores.nombre.trim()

  if (!nombre) {
    errores.nombre = 'Escribe tu nombre completo.'
  } else if (!/^[\p{L}\s'.-]+$/u.test(nombre)) {
    errores.nombre = 'El nombre solo puede contener letras.'
  } else if (nombre.split(/\s+/).length < 2) {
    errores.nombre = 'Escribe tu nombre y tu apellido.'
  }

  const correo = valores.correo.trim()

  if (!correo) {
    errores.correo = 'Escribe tu correo electrónico.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)) {
    errores.correo = 'Escribe un correo válido, por ejemplo nombre@correo.com.'
  }

  const telefono = valores.telefono.replace(/[\s-]/g, '')

  if (!telefono) {
    errores.telefono = 'Escribe tu número de teléfono.'
  } else if (!/^(\+?57)?3\d{9}$/.test(telefono)) {
    errores.telefono = 'Escribe un celular válido de 10 dígitos, por ejemplo 300 000 0000.'
  }

  if (!valores.fecha) {
    errores.fecha = 'Elige la fecha de tu reserva.'
  } else if (valores.fecha < aFechaISO(ahora)) {
    errores.fecha = 'La fecha no puede ser anterior a hoy.'
  } else if (valores.fecha > fechaLimite(ahora)) {
    errores.fecha = `Solo recibimos reservas con máximo ${MAX_DIAS_ANTICIPACION} días de anticipación.`
  }

  if (!valores.hora) {
    errores.hora = 'Elige la hora de tu reserva.'
  } else if (
    valores.hora < HORA_APERTURA ||
    valores.hora > HORA_ULTIMA_RESERVA
  ) {
    errores.hora = `Elige una hora entre ${formatoHora(HORA_APERTURA)} y ${formatoHora(HORA_ULTIMA_RESERVA)}`
  } else if (
    valores.fecha === aFechaISO(ahora) &&
    valores.hora <= horaActual(ahora)
  ) {
    errores.hora = 'Esa hora ya pasó. Elige una hora posterior a la actual.'
  }

  const personas = Number(valores.personas)

  if (valores.personas === '') {
    errores.personas = 'Indica cuántas personas asistirán.'
  } else if (!Number.isInteger(personas) || personas < 1) {
    errores.personas = 'Escribe un número entero de personas (mínimo 1).'
  } else if (personas > MAX_PERSONAS) {
    errores.personas = `Para grupos de más de ${MAX_PERSONAS} personas, contáctanos directamente.`
  }

  return errores
}

function Campo({ nombre, etiqueta, error, children }) {
  return (
    <Form.Field error={Boolean(error)}>
      <label htmlFor={`reserva-${nombre}`}>{etiqueta}</label>

      {children}

      {error && (
        <span
          id={`reserva-${nombre}-error`}
          className="reserva-error"
          role="alert"
        >
          {error}
        </span>
      )}
    </Form.Field>
  )
}

function Reservas() {

  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [confirmada, setConfirmada] = useState(null)

  const validarCampo = (campo, valoresActuales) => {
    const resultado = validarReserva(valoresActuales, new Date())

    setErrores((previos) => ({ ...previos, [campo]: resultado[campo] }))
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target
    const nuevosValores = { ...valores, [name]: value }

    setValores(nuevosValores)

    if (errores[name]) {
      validarCampo(name, nuevosValores)
    }

    if (name === 'fecha' && nuevosValores.hora) {
      validarCampo('hora', nuevosValores)
    }
  }

  const manejarSalida = (e) => {
    validarCampo(e.target.name, valores)
  }

  const manejarEnvio = (e) => {
    e.preventDefault()

    const resultado = validarReserva(valores, new Date())
    setErrores(resultado)

    const primerError = CAMPOS_OBLIGATORIOS.find((campo) => resultado[campo])

    if (primerError) {
      document.getElementById(`reserva-${primerError}`)?.focus()
      return
    }

    setConfirmada({
      ...valores,
      nombre: valores.nombre.trim(),
      correo: valores.correo.trim()
    })
  }

  const nuevaReserva = () => {
    setValores(VALORES_INICIALES)
    setErrores({})
    setConfirmada(null)
  }

  const propsCampo = (nombre) => ({
    id: `reserva-${nombre}`,
    name: nombre,
    value: valores[nombre],
    onChange: manejarCambio,
    onBlur: manejarSalida,
    'aria-invalid': Boolean(errores[nombre]),
    'aria-describedby': errores[nombre] ? `reserva-${nombre}-error` : undefined
  })

  return (
    <section className="reserva-seccion">
      <Container>

        <div className="reserva-encabezado">
          <h1>Reserva tu mesa</h1>
          <p>Completa el formulario para reservar</p>
        </div>

        <Grid columns={2} stackable>

          <Grid.Column>
            <div className="reserva-tarjeta">

              {confirmada ? (

                <div className="reserva-confirmacion" role="status">
                  <Icon name="check circle outline" size="huge" />

                  <h2>¡Reserva recibida!</h2>

                  <p>
                    Gracias, {confirmada.nombre.split(/\s+/)[0]}. Estos son los
                    datos de tu reserva:
                  </p>

                  <ul>
                    <li><strong>Fecha:</strong> {formatoFecha(confirmada.fecha)}</li>
                    <li><strong>Hora:</strong> {formatoHora(confirmada.hora)}</li>
                    <li><strong>Personas:</strong> {confirmada.personas}</li>
                    <li><strong>Correo:</strong> {confirmada.correo}</li>
                    <li><strong>Teléfono:</strong> {confirmada.telefono}</li>
                  </ul>

                  <Button
                    type="button"
                    className="boton-confirmar"
                    onClick={nuevaReserva}
                  >
                    Hacer otra reserva
                  </Button>
                </div>

              ) : (

                <Form
                  className="reserva-formulario"
                  noValidate
                  onSubmit={manejarEnvio}
                >

                  <Campo nombre="nombre" etiqueta="Nombre completo" error={errores.nombre}>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Ej. María Fernanda Gómez"
                      {...propsCampo('nombre')}
                    />
                  </Campo>

                  <Campo nombre="correo" etiqueta="Correo electrónico" error={errores.correo}>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="nombre@correo.com"
                      {...propsCampo('correo')}
                    />
                  </Campo>

                  <Campo nombre="telefono" etiqueta="Teléfono" error={errores.telefono}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="300 000 0000"
                      {...propsCampo('telefono')}
                    />
                  </Campo>

                  <Form.Group widths="equal">
                    <Campo nombre="fecha" etiqueta="Fecha" error={errores.fecha}>
                      <input
                        type="date"
                        min={FECHA_MINIMA}
                        max={FECHA_MAXIMA}
                        {...propsCampo('fecha')}
                      />
                    </Campo>

                    <Campo nombre="hora" etiqueta="Hora" error={errores.hora}>
                      <input
                        type="time"
                        min={HORA_APERTURA}
                        max={HORA_ULTIMA_RESERVA}
                        step="900"
                        {...propsCampo('hora')}
                      />
                    </Campo>
                  </Form.Group>

                  <Campo nombre="personas" etiqueta="Número de personas" error={errores.personas}>
                    <input
                      type="number"
                      min="1"
                      max={MAX_PERSONAS}
                      inputMode="numeric"
                      placeholder="Ej. 2"
                      {...propsCampo('personas')}
                    />
                  </Campo>

                  <Campo nombre="observaciones" etiqueta="Observaciones (opcional)">
                    <textarea
                      rows={3}
                      maxLength={MAX_OBSERVACIONES}
                      placeholder="Alergias, celebraciones, silla para bebé..."
                      {...propsCampo('observaciones')}
                    />
                    <span className="reserva-contador">
                      {valores.observaciones.length}/{MAX_OBSERVACIONES}
                    </span>
                  </Campo>

                  <Button type="submit" fluid className="boton-confirmar">
                    Confirmar reserva
                  </Button>

                </Form>

              )}

            </div>
          </Grid.Column>

          <Grid.Column className="reserva-columna-imagen">
            <div className="reserva-imagen">
              <img
                src={brunchImg}
                alt="Mesa con diferentes platos de brunch"
              />
            </div>
          </Grid.Column>

        </Grid>

      </Container>
    </section>
  )
}

export default Reservas