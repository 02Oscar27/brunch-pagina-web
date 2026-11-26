import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/Chatbot.jsx'
import CarritoFlotante from './components/CarritoFlotante.jsx'
import FacturaCompra from './components/FacturaCompra.jsx'

import Inicio from './pages/Inicio.jsx'
import Menu from './pages/Menu.jsx'
import Reservas from './pages/Reservas.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Ubicacion from './pages/Ubicacion.jsx'

function App() {
  const [carrito, setCarrito] = useState({})
  const [factura, setFactura] = useState(null)
  const [facturaAbierta, setFacturaAbierta] = useState(false)
  const [panelActivo, setPanelActivo] = useState(null)
  const totalUnidades = Object.values(carrito).reduce((total, item) => total + item.cantidad, 0)
  const carritoAbierto = panelActivo === 'carrito-navbar' || panelActivo === 'carrito-flotante'

  // Una sola finalización de compra para ambos accesos al carrito.
  const finalizarCompra = () => {
    const productosComprados = Object.values(carrito)
    if (productosComprados.length === 0) return

    // Copiar el detalle antes de vaciar el carrito.
    const items = productosComprados.map(({ producto, cantidad }) => ({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad,
      subtotal: producto.precio * cantidad,
    }))
    const ahora = new Date()

    setFactura({
      numero: 'DEMO-' + ahora.getTime(),
      fecha: ahora.toISOString(),
      items,
      total: items.reduce((acumulado, item) => acumulado + item.subtotal, 0),
    })
    setFacturaAbierta(true)
    setCarrito({})
    setPanelActivo(null)
  }

  const verUltimaFactura = () => {
    if (factura) {
      setPanelActivo(null)
      setFacturaAbierta(true)
    }
  }

  const cambiarCantidad = (producto, cambio) => {
    setCarrito((actual) => {
      const cantidadActual = actual[producto.id]?.cantidad || 0
      const nuevaCantidad = Math.max(0, cantidadActual + cambio)
      const nuevoCarrito = { ...actual }

      if (nuevaCantidad === 0) {
        delete nuevoCarrito[producto.id]
      } else {
        nuevoCarrito[producto.id] = { producto, cantidad: nuevaCantidad }
      }

      return nuevoCarrito
    })
  }

  return (
    <div>
      <Navbar
        totalUnidades={totalUnidades}
        carritoAbierto={carritoAbierto}
        onAlternarCarrito={() => setPanelActivo((actual) => actual === 'carrito-navbar' ? null : 'carrito-navbar')}
        onAbrirMenu={() => setPanelActivo(null)}
      />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/menu"
            element={
              <Menu
                carrito={carrito}
                cambiarCantidad={cambiarCantidad}
              />
            }
          />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
        </Routes>
      </main>

      <Footer />
      <CarritoFlotante
        carrito={carrito}
        cambiarCantidad={cambiarCantidad}
        finalizarCompra={finalizarCompra}
        verUltimaFactura={verUltimaFactura}
        tieneFactura={Boolean(factura)}
        abierto={carritoAbierto}
        origen={panelActivo === 'carrito-navbar' ? 'navbar' : 'flotante'}
        chatbotAbierto={panelActivo === 'chatbot'}
        onAlternar={() => setPanelActivo((actual) => actual === 'carrito-flotante' ? null : 'carrito-flotante')}
        onCerrar={() => setPanelActivo(null)}
      />
      <Chatbot
        abierto={panelActivo === 'chatbot'}
        onAlternar={() => setPanelActivo((actual) => actual === 'chatbot' ? null : 'chatbot')}
        onCerrar={() => setPanelActivo(null)}
      />
      {facturaAbierta && factura && (
        <FacturaCompra factura={factura} onCerrar={() => setFacturaAbierta(false)} />
      )}
    </div>
  )
}

export default App