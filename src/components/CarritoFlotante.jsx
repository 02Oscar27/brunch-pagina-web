import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CarritoFlotante.css'

const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
})

function CarritoFlotante({
  carrito,
  cambiarCantidad,
  finalizarCompra,
  verUltimaFactura,
  tieneFactura,
  abierto,
  origen,
  onAlternar,
  onCerrar,
  chatbotAbierto
}) {
  const productos = Object.values(carrito)
  const totalUnidades = productos.reduce((total, item) => total + item.cantidad, 0)
  const totalPrecio = productos.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  )

  // Permite cerrar el panel con Escape desde cualquier control.
  useEffect(() => {
    if (!abierto) return undefined

    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }

    window.addEventListener('keydown', cerrarConEscape)
    return () => window.removeEventListener('keydown', cerrarConEscape)
  }, [abierto, onCerrar])

  return (
    <div className="carrito-global">
      {/* Se oculta mientras el chatbot está abierto para no tapar sus mensajes. */}
      {!chatbotAbierto && (
        <button
          type="button"
          className="carrito-global-boton"
          onClick={onAlternar}
          aria-label={`${abierto ? 'Cerrar' : 'Abrir'} carrito. ${totalUnidades} productos`}
          aria-expanded={abierto}
          aria-controls="carrito-global-panel"
        >
          <svg className="carrito-global-icono" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
            <circle cx="10" cy="20" r="1.2" />
            <circle cx="18" cy="20" r="1.2" />
          </svg>
          <span>Carrito</span>
          <span className="carrito-global-contador" aria-hidden="true">
            {totalUnidades}
          </span>
        </button>
      )}

      {abierto && (
        <aside
          id="carrito-global-panel"
          className={`carrito-global-panel ${origen === 'navbar' ? 'carrito-global-panel-navbar' : ''}`}
          aria-labelledby="carrito-global-titulo"
        >
          <div className="carrito-global-cabecera">
            <h2 id="carrito-global-titulo">Tu carrito</h2>
            <button
              type="button"
              className="carrito-global-cerrar"
              onClick={onCerrar}
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>

          {productos.length === 0 ? (
            <div className="carrito-global-vacio">
              <p>Tu carrito está vacío. Agrega tus platos favoritos.</p>
              <Link className="carrito-global-enlace" to="/menu" onClick={onCerrar}>
                Explorar el Menú
              </Link>
            </div>
          ) : (
            <>
              <ul className="carrito-global-lista">
                {productos.map(({ producto, cantidad }) => (
                  <li className="carrito-global-producto" key={producto.id}>
                    <img src={producto.imagen} alt="" />
                    <div className="carrito-global-detalle">
                      <strong>{producto.nombre}</strong>
                      <span>{formatoCOP.format(producto.precio)}</span>
                      <div className="carrito-global-controles">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(producto, -1)}
                          aria-label={`Quitar una unidad de ${producto.nombre}`}
                        >
                          −
                        </button>
                        <span aria-live="polite">{cantidad}</span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(producto, 1)}
                          aria-label={`Agregar una unidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="carrito-global-total">
                <span>Total</span>
                <strong>{formatoCOP.format(totalPrecio)}</strong>
              </div>
              <button
                type="button"
                className="carrito-global-accion"
                onClick={finalizarCompra}
              >
                Realizar compra
              </button>
              <p className="carrito-global-nota">
                Compra de demostración: no se procesan pagos reales.
              </p>
            </>
          )}

          {tieneFactura && (
            <button
              type="button"
              className="carrito-global-secundario"
              onClick={verUltimaFactura}
            >
              Ver último comprobante
            </button>
          )}
        </aside>
      )}
    </div>
  )
}

export default CarritoFlotante
