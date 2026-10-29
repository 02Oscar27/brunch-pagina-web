import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/Chatbot.jsx'

import Inicio from './pages/Inicio.jsx'
import Menu from './pages/Menu.jsx'
import Reservas from './pages/Reservas.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Ubicacion from './pages/Ubicacion.jsx'

function App() {
  const [carrito, setCarrito] = useState({})

  // Se comparte el mismo carrito entre el menú y el navbar.
  const vaciarCarrito = () => setCarrito({})

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
      <Navbar carrito={carrito} cambiarCantidad={cambiarCantidad} vaciarCarrito={vaciarCarrito} />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/menu"
            element={<Menu carrito={carrito} cambiarCantidad={cambiarCantidad} />}
          />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/ubicacion" element={<Ubicacion />} />
        </Routes>
      </main>

      <Footer />
      <Chatbot />
    </div>
  )
}

export default App