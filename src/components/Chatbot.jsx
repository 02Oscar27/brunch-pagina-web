import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Input } from 'semantic-ui-react'
import { obtenerRespuesta } from '../data/chatbotRespuestas.js'
import './Chatbot.css'

const MENSAJE_INICIAL = {
  rol: 'bot',
  texto: '¡Hola! Bienvenido a Brunch. Puedo ayudarte con el menú, horarios, reservas, pedidos y pagos simulados.'
}

const PREGUNTAS_RAPIDAS = [
  { etiqueta: 'Menú', pregunta: 'Quiero ver el menú' },
  { etiqueta: 'Reservas', pregunta: 'Quiero reservar una mesa' },
  { etiqueta: 'Horario', pregunta: '¿Cuál es el horario?' },
  { etiqueta: 'Pedidos', pregunta: '¿Cómo hago un pedido?' },
  { etiqueta: 'Pagos', pregunta: '¿Cómo puedo pagar?' },
  { etiqueta: 'Ubicación', pregunta: '¿Dónde están ubicados?' }
]

function Chatbot({ abierto, onAlternar, onCerrar }) {
  const [mensajes, setMensajes] = useState([MENSAJE_INICIAL])
  const [texto, setTexto] = useState('')
  const mensajesRef = useRef(null)

  const agregarPregunta = (pregunta) => {
    if (!pregunta.trim()) return

    const respuesta = obtenerRespuesta(pregunta)

    setMensajes((anteriores) => [
      ...anteriores,
      { rol: 'usuario', texto: pregunta.trim() },
      { rol: 'bot', ...respuesta }
    ])
  }

  const enviarMensaje = (evento) => {
    evento.preventDefault()
    if (!texto.trim()) return

    agregarPregunta(texto)
    setTexto('')
  }

  useEffect(() => {
    if (abierto && mensajesRef.current) {
      mensajesRef.current.scrollTop = mensajesRef.current.scrollHeight
    }
  }, [mensajes, abierto])

  return (
    <div className="chatbot">
      <Button
        type="button"
        circular
        className="chatbot-boton"
        onClick={onAlternar}
        aria-label={abierto ? 'Cerrar chatbot' : 'Abrir chatbot'}
        aria-expanded={abierto}
        aria-controls="chatbot-ventana"
      >
        {abierto ? <Icon name="close" /> : 'CB'}
      </Button>

      {abierto && (
        <section
          id="chatbot-ventana"
          className="chatbot-ventana"
          aria-label="Asistente de preguntas frecuentes de Brunch"
        >
          <div className="chatbot-encabezado">
            Asistente Brunch
          </div>

          <div
            className="chatbot-mensajes"
            ref={mensajesRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions"
            aria-label="Conversación"
          >
            {mensajes.map((mensaje, indice) => (
              <div
                key={indice}
                className={`mensaje ${mensaje.rol}`}
              >
                <span>{mensaje.texto}</span>
                {mensaje.ruta && (
                  <Link
                    to={mensaje.ruta}
                    className="chatbot-enlace"
                    onClick={onCerrar}
                  >
                    {mensaje.enlace}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="chatbot-opciones" aria-label="Preguntas rápidas">
            {PREGUNTAS_RAPIDAS.map((opcion) => (
              <Button
                type="button"
                key={opcion.etiqueta}
                size="mini"
                onClick={() => agregarPregunta(opcion.pregunta)}
              >
                {opcion.etiqueta}
              </Button>
            ))}
          </div>

          <form className="chatbot-formulario" onSubmit={enviarMensaje}>
            <Input
              fluid
              aria-label="Escribe una pregunta para el asistente"
              placeholder="Escribe tu pregunta..."
              value={texto}
              onChange={(evento) => setTexto(evento.target.value)}
            />
            <Button
              type="submit"
              icon="send"
              aria-label="Enviar pregunta"
              disabled={!texto.trim()}
            />
          </form>
        </section>
      )}
    </div>
  )
}

export default Chatbot
