// Respuestas locales basadas en reglas; no utiliza servicios de IA.
function normalizarPregunta(pregunta) {
  return pregunta
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function obtenerRespuesta(pregunta) {
  const mensaje = normalizarPregunta(pregunta)

  // Prioridad: la intención de pagar, reservar o pedir prevalece
  // sobre palabras genéricas como "producto" o "plato".
  if (/\b(pagar|pago|pagos|tarjeta|efectivo|transferencia|factura|comprobante|cobrar|cobro)\b/.test(mensaje)) {
    return {
      texto: 'Brunch es una demostración académica: no procesamos pagos reales. Puedes simular una compra desde el carrito y obtener un comprobante sin validez tributaria.',
      ruta: '/menu',
      enlace: 'Ir al Menú'
    }
  }

  if (/\b(reservar|reserva|reservas|reservacion|reservaciones|mesa|mesas|apartar)\b/.test(mensaje)) {
    return {
      texto: 'Puedes completar el formulario de Reservas para simular la solicitud de una mesa. No se registra en un servidor.',
      ruta: '/reservas',
      enlace: 'Ir a Reservas'
    }
  }

  if (/\b(pedir|pedido|pedidos|ordenar|orden|ordenes|comprar|compra|compras|carrito|domicilio|domicilios|entrega|envio)\b/.test(mensaje)) {
    return {
      texto: 'Puedes agregar platos al carrito desde el Menú, ajustar cantidades y finalizar una compra simulada. No se envían pedidos reales ni se gestionan entregas.',
      ruta: '/menu',
      enlace: 'Explorar el Menú'
    }
  }

  if (/\b(horario|horarios|hora|horas|abren|abre|abrir|cierran|cierra|abierto|atencion|atienden)\b/.test(mensaje)) {
    return {
      texto: 'El horario mostrado de Brunch es de lunes a domingo, de 8:00 a. m. a 3:00 p. m.',
      ruta: '/ubicacion',
      enlace: 'Ver ubicación y horario'
    }
  }

  if (/\b(ubicacion|ubicados|ubican|direccion|donde|queda|quedan|llegar|mapa|neiva)\b/.test(mensaje)) {
    return {
      texto: 'La página Ubicación muestra como referencia Neiva, Huila, Colombia. La dirección exacta del restaurante aún está por definir.',
      ruta: '/ubicacion',
      enlace: 'Ver el mapa'
    }
  }

  if (/\b(menu|plato|platos|producto|productos|comida|desayuno|desayunos|precio|precios|cafe|waffle|waffles|pancake|pancakes|ingrediente|ingredientes)\b/.test(mensaje)) {
    return {
      texto: 'En el Menú encontrarás los platos, ingredientes y precios de Brunch.',
      ruta: '/menu',
      enlace: 'Ver el Menú'
    }
  }

  return {
    texto: 'Puedo orientarte sobre el menú, los horarios, la ubicación, las reservas, los pedidos y los pagos simulados. Elige una pregunta rápida o escribe una de esas consultas.'
  }
}
