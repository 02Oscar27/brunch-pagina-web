// Servicio dedicado a consultar Open-Meteo.
// Las coordenadas corresponden a una referencia aproximada de Neiva.
const LATITUD = 2.93001
const LONGITUD = -75.27973

const URL_CLIMA =
  `https://api.open-meteo.com/v1/forecast?latitude=${LATITUD}&longitude=${LONGITUD}&current=temperature_2m,relative_humidity_2m&timezone=America%2FBogota`

export async function consultarClima(signal) {
  const respuesta = await fetch(URL_CLIMA, { signal })

  if (!respuesta.ok) {
    throw new Error(`Open-Meteo respondió con HTTP ${respuesta.status}`)
  }

  const datos = await respuesta.json()
  const temperatura = datos.current?.temperature_2m
  const humedad = datos.current?.relative_humidity_2m

  if (!Number.isFinite(temperatura) || !Number.isFinite(humedad)) {
    throw new Error('La API no devolvió temperatura y humedad válidas.')
  }

  return { temperatura, humedad }
}
