import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

// El Navbar ofrece un segundo acceso al mismo carrito global de App.jsx.
function Navbar({ totalUnidades, carritoAbierto, onAlternarCarrito }) {
  return (
    <Menu className="navbar-brunch">
      <Menu.Item as={NavLink} to="/" end header className="navbar-logo">
        <span className="marca-brunch">
          Brunch<span className="marca-acento">.</span>
        </span>
      </Menu.Item>

      <Menu.Item as={NavLink} to="/" end>Inicio</Menu.Item>
      <Menu.Item as={NavLink} to="/menu">Menú</Menu.Item>
      <Menu.Item as={NavLink} to="/reservas">Reservas</Menu.Item>
      <Menu.Item as={NavLink} to="/nosotros">Nosotros</Menu.Item>
      <Menu.Item as={NavLink} to="/ubicacion">Ubicación</Menu.Item>
      <Menu.Item className="navbar-carrito-item">
        <button
          type="button"
          className="navbar-carrito-boton"
          onClick={onAlternarCarrito}
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
