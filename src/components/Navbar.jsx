import { useEffect, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

// El Navbar conserva el carrito compartido y muestra un menú desplegable en móviles.
function Navbar({ totalUnidades, carritoAbierto, onAlternarCarrito, onAbrirMenu }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

  const alternarMenu = () => {
    if (!menuAbierto) onAbrirMenu?.()
    setMenuAbierto((anterior) => !anterior)
  }

  useEffect(() => {
    if (!menuAbierto) return undefined

    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') cerrarMenu()
    }

    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [menuAbierto])

  return (
    <Menu className={`navbar-brunch ${menuAbierto ? 'navbar-abierto' : ''}`}>
      <Menu.Item as={NavLink} to="/" end header className="navbar-logo" onClick={cerrarMenu}>
        <span className="marca-brunch">
          Brunch<span className="marca-acento">.</span>
        </span>
      </Menu.Item>

      <button
        type="button"
        className="navbar-menu-toggle"
        onClick={alternarMenu}
        aria-expanded={menuAbierto}
        aria-controls="navbar-enlaces"
        aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
      >
        {menuAbierto ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
        <span className="navbar-menu-texto">Menú</span>
      </button>

      <div id="navbar-enlaces" className="navbar-enlaces">
        <Menu.Item as={NavLink} to="/" end onClick={cerrarMenu}>Inicio</Menu.Item>
        <Menu.Item as={NavLink} to="/menu" onClick={cerrarMenu}>Menú</Menu.Item>
        <Menu.Item as={NavLink} to="/reservas" onClick={cerrarMenu}>Reservas</Menu.Item>
        <Menu.Item as={NavLink} to="/nosotros" onClick={cerrarMenu}>Nosotros</Menu.Item>
        <Menu.Item as={NavLink} to="/ubicacion" onClick={cerrarMenu}>Ubicación</Menu.Item>
      </div>

      <Menu.Item className="navbar-carrito-item">
        <button
          type="button"
          className="navbar-carrito-boton"
          onClick={() => {
            cerrarMenu()
            onAlternarCarrito()
          }}
          aria-label={`${carritoAbierto ? 'Cerrar' : 'Abrir'} carrito. ${totalUnidades} productos`}
          aria-expanded={carritoAbierto}
          aria-controls="carrito-global-panel"
        >
          <svg className="navbar-carrito-icono" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
          </svg>
          <span className="navbar-carrito-texto">Carrito</span>
          <span className="navbar-carrito-contador" aria-hidden="true">{totalUnidades}</span>
        </button>
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
