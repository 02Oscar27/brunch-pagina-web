import { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar({ carrito = {}, cambiarCantidad }) {
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const productosCarrito = Object.values(carrito)
  const totalUnidades = productosCarrito.reduce((total, item) => total + item.cantidad, 0)
  const totalPrecio = productosCarrito.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  )

  const formatoPrecio = (precio) =>
    precio.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    })

  return (
    <Menu className="navbar-brunch">
      <Menu.Item
        as={NavLink}
        to="/"
        end
        header
        className="navbar-logo"
      >
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
          onClick={() => setCarritoAbierto((abierto) => !abierto)}
          aria-label={`Abrir carrito. ${totalUnidades} productos`}
          aria-expanded={carritoAbierto}
        >
          <svg className="navbar-carrito-icono" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
          </svg>
          <span>Carrito</span>
          <span className="navbar-carrito-contador">{totalUnidades}</span>
        </button>

        {carritoAbierto && (
          <aside className="navbar-carrito-panel" aria-label="Contenido del carrito">
            <div className="navbar-carrito-cabecera">
              <h2>Tu carrito</h2>
              <button
                type="button"
                className="navbar-carrito-cerrar"
                onClick={() => setCarritoAbierto(false)}
                aria-label="Cerrar carrito"
              >×</button>
            </div>

            {productosCarrito.length === 0 ? (
              <p className="navbar-carrito-vacio">
                Tu carrito está vacío. Agrega tus platos favoritos desde el menú.
              </p>
            ) : (
              <>
                <ul className="navbar-carrito-lista">
                  {productosCarrito.map(({ producto, cantidad }) => (
                    <li className="navbar-carrito-producto" key={producto.id}>
                      <img src={producto.imagen} alt="" />
                      <div className="navbar-carrito-detalle">
                        <strong>{producto.nombre}</strong>
                        <span>{formatoPrecio(producto.precio)}</span>
                        <div className="navbar-carrito-controles">
                          <button
                            type="button"
                            onClick={() => cambiarCantidad(producto, -1)}
                            aria-label={`Quitar una unidad de ${producto.nombre}`}
                          >−</button>
                          <span>{cantidad}</span>
                          <button
                            type="button"
                            onClick={() => cambiarCantidad(producto, 1)}
                            aria-label={`Agregar una unidad de ${producto.nombre}`}
                          >+</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="navbar-carrito-total">
                  <span>Total</span>
                  <strong>{formatoPrecio(totalPrecio)}</strong>
                </div>
                <p className="navbar-carrito-nota">
                  Vista previa: todavía no procesa pagos ni pedidos.
                </p>
              </>
            )}
          </aside>
        )}
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
