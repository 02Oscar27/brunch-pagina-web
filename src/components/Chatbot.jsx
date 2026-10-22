import { useState, useEffect, useRef } from 'react'
import { Button, Icon, Input } from 'semantic-ui-react'

import './Chatbot.css'

function Chatbot() {

    // Controla si el chatbot está abierto
    const [abierto, setAbierto] = useState(false)

    // Almacena los mensajes de la conversación
    const [mensajes, setMensajes] = useState([
    {
      rol: 'bot',
      texto: '¡Hola! Bienvenido a Brunch. ¿En qué puedo ayudarte?'
    }
    ])

    // Guarda lo que escribe el usuario
    const [texto, setTexto] = useState('')

    // Determina la respuesta según la pregunta
    const obtenerRespuesta = (pregunta) => {

    const mensaje = pregunta.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')

    if (mensaje.includes('menu') || mensaje.includes('plato')) {
      return 'Puedes consultar nuestros platos y precios en la sección Menú.'
    }

    if (mensaje.includes('reserva')) {
      return 'Para solicitar una mesa, visita la sección Reservas.'
    }

    if (mensaje.includes('ubicacion') || mensaje.includes('direccion') || mensaje.includes('donde') ) {
      return 'Puedes consultar dónde estamos en la sección Ubicación.'
    }

    return 'Puedo ayudarte con información sobre el menú, reservas y ubicación.'
    }

    const agregarPregunta = (pregunta) => {
    if (!pregunta.trim()) return

      setMensajes((anteriores) => [
      ...anteriores,
      { rol: 'usuario', texto: pregunta },
      { rol: 'bot', texto: obtenerRespuesta(pregunta) }
    ])
    } 

    // Envía el mensaje y genera la respuesta
    const enviarMensaje = (e) => {
      e.preventDefault()
      agregarPregunta(texto)
      setTexto('')
    }

    
    const mensajesRef = useRef(null)

      useEffect(() => {

    if (abierto && mensajesRef.current) {
      mensajesRef.current.scrollTop =
      mensajesRef.current.scrollHeight
    }

    }, [mensajes, abierto])


    return (
    <div className="chatbot">

      <Button
        circular
        className="chatbot-boton"
        onClick={() => setAbierto(!abierto)}
        aria-label={abierto ? 'Cerrar chatbot' : 'Abrir chatbot'}
        aria-expanded={abierto}
      >
        {abierto ? <Icon name="close" /> : 'CB'}
      </Button>

      {abierto && (
        <div className="chatbot-ventana">

          <div className="chatbot-encabezado">
            Asistente Brunch
          </div>

          <div
            className="chatbot-mensajes"
            ref={mensajesRef}
            role="log"
            aria-live="polite"
          >
            {mensajes.map((mensaje, index) => (
              <div
                key={index}
                className={`mensaje ${mensaje.rol}`}
              >
                {mensaje.texto}
              </div>
            ))}
          </div>

            <div className="chatbot-opciones">
              <Button
                size="mini"
                onClick={() => agregarPregunta('Quiero ver el menú')}
              >
                Ver menú
              </Button>

              <Button
                size="mini"
                onClick={() => agregarPregunta('Quiero reservar')}
              >
                Reservas
              </Button>

              <Button
                size="mini"
                onClick={() => agregarPregunta('¿Dónde están ubicados?')}
              >
              Ubicación
              </Button>
            </div>

          <form
            className="chatbot-formulario"
            onSubmit={enviarMensaje}
          >
            <Input
              fluid
              placeholder="Escribe tu pregunta..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

            <Button type="submit" icon="send" />
          </form>

        </div>
      )}

    </div>
    )

    
}

export default Chatbot