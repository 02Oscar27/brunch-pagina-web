import { useEffect, useRef } from 'react'
import './FacturaCompra.css'

const formatoCOP = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(valor)

function FacturaCompra({ factura, onCerrar }) {
  const cerrarRef = useRef(null)

  useEffect(() => {
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cerrarRef.current?.focus()

    const cerrarConEscape = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }

    window.addEventListener('keydown', cerrarConEscape)
    return () => {
      window.removeEventListener('keydown', cerrarConEscape)
      document.body.style.overflow = overflowAnterior
    }
  }, [onCerrar])

  const fechaCompra = new Date(factura.fecha).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return (
    <div
      className="factura-superposicion"
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar()
      }}
    >
      <section
        className="factura-ventana"
        role="dialog"
        aria-modal="true"
        aria-labelledby="factura-titulo"
        aria-describedby="factura-advertencia"
      >
        <div className="factura-acciones">
          <button
            type="button"
            className="factura-boton-imprimir"
            onClick={() => window.print()}
          >
            Imprimir / Guardar como PDF
          </button>
          <button
            type="button"
            className="factura-boton-cerrar"
            ref={cerrarRef}
            onClick={onCerrar}
            aria-label="Cerrar factura"
          >
            ×
          </button>
        </div>

        <article className="factura-documento">
          <header className="factura-encabezado">
            <h2 id="factura-titulo">
              Brunch<span>.</span>
            </h2>
            <p>Factura de compra simulada</p>
            <p className="factura-advertencia" id="factura-advertencia">
              Documento académico sin validez tributaria
            </p>
          </header>

          <dl className="factura-datos">
            <div>
              <dt>Número de comprobante</dt>
              <dd>{factura.numero}</dd>
            </div>
            <div>
              <dt>Fecha y hora</dt>
              <dd>{fechaCompra}</dd>
            </div>
          </dl>

          <div className="factura-tabla-contenedor">
            <table className="factura-tabla">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Cant.</th>
                  <th scope="col">Precio unit.</th>
                  <th scope="col">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {factura.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatoCOP(item.precio)}</td>
                    <td>{formatoCOP(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="factura-total">
            <span>Total de la compra</span>
            <strong>{formatoCOP(factura.total)}</strong>
          </div>

          <footer className="factura-pie">
            <p>¡Gracias por elegir Brunch!</p>
            <small>
              Compra de demostración. No se procesaron pagos ni se emitió
              una factura electrónica de la DIAN.
            </small>
          </footer>
        </article>
      </section>
    </div>
  )
}

export default FacturaCompra
