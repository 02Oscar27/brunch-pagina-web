
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../components/menu/Menu.css";
import { productos } from "../data/platos.js";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const categorias = ["Todos", "Desayunos", "Dulces", "Bebidas"];

function Menu({ carrito = {}, cambiarCantidad }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [cantidadVisible, setCantidadVisible] = useState(6);
  const [tarjetasGiradas, setTarjetasGiradas] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [avisoCompra, setAvisoCompra] = useState(false);

  const menuRef = useRef(null);
  const encabezadoRef = useRef(null);
  const tarjetasRef = useRef(null);

  // Comprobar si el usuario prefiere reducir las animaciones.
  const reducirMovimiento = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animación de entrada del encabezado y los filtros.
  useGSAP(
    () => {
      if (reducirMovimiento()) return;

      const elementos = gsap.utils.toArray(
        [
          ".menu-eyebrow",
          ".menu-titulo",
          ".menu-subtitulo",
          ".menu-buscador",
        ],
        encabezadoRef.current
      );

      gsap.from(elementos, {
        y: 24,
        opacity: 0,
        duration: 0.65,
        stagger: 0.13,
        ease: "power2.out",
        clearProps: "all",
      });

      gsap.from(".menu-filtro", {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.25,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: menuRef }
  );

  // Animación de las tarjetas al entrar en pantalla.
  // Se ejecuta también cuando cambian los filtros o la búsqueda.
  useGSAP(
    () => {
      if (reducirMovimiento()) return;

      const tarjetas = gsap.utils.toArray(
        ".menu-tarjeta",
        tarjetasRef.current
      );

      if (!tarjetas.length) return;

      gsap.fromTo(
        tarjetas,
        {
          autoAlpha: 0,
          y: 28,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          stagger: 0.075,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: tarjetasRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    {
      scope: menuRef,
      dependencies: [categoriaActiva, busqueda, cantidadVisible],
      revertOnUpdate: true,
    }
  );

  // Filtrar productos por categoría y búsqueda.
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todos" ||
      producto.categoria === categoriaActiva;

    const termino = busqueda.trim().toLowerCase();

    const coincideNombre = producto.nombre
      .toLowerCase()
      .includes(termino);

    const coincideDescripcion = (producto.descripcion || "")
      .toLowerCase()
      .includes(termino);

    const coincideIngredientes = (producto.ingredientes || []).some(
      (ingrediente) =>
        ingrediente.toLowerCase().includes(termino)
    );

    return (
      coincideCategoria &&
      (coincideNombre ||
        coincideDescripcion ||
        coincideIngredientes)
    );
  });

  const productosVisibles = productosFiltrados.slice(
    0,
    cantidadVisible
  );

  // Obtener los productos del carrito.
  const productosCarrito = Object.values(carrito);

  const totalUnidades = productosCarrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalPrecio = productosCarrito.reduce(
    (total, item) =>
      total + item.producto.precio * item.cantidad,
    0
  );

  // Animar el contador cuando cambia la cantidad.
  useGSAP(
    () => {
      if (reducirMovimiento()) return;

      const contador = menuRef.current?.querySelector(
        ".menu-carrito-contador"
      );

      if (!contador) return;

      gsap.fromTo(
        contador,
        { scale: 0.65, rotate: -12 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.42,
          ease: "back.out(2.8)",
        }
      );
    },
    {
      scope: menuRef,
      dependencies: [totalUnidades],
      revertOnUpdate: true,
    }
  );

  // Animación de apertura del panel del carrito.
  useGSAP(
    () => {
      if (!carritoAbierto || reducirMovimiento()) return;

      const panel = menuRef.current?.querySelector(
        ".menu-carrito-panel-flotante"
      );

      if (!panel) return;

      gsap.fromTo(
        panel,
        {
          autoAlpha: 0,
          y: 18,
          scale: 0.97,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.32,
          ease: "power2.out",
        }
      );
    },
    {
      scope: menuRef,
      dependencies: [carritoAbierto],
      revertOnUpdate: true,
    }
  );

  // Formatear los precios en pesos colombianos.
  const formatoPrecio = (precio) =>
    precio.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  // Cambiar la categoría seleccionada.
  const cambiarCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    setCantidadVisible(6);
    setTarjetasGiradas([]);
  };

  // Girar una tarjeta para mostrar su descripción.
  const alternarTarjeta = (id) => {
    setTarjetasGiradas((actuales) =>
      actuales.includes(id)
        ? actuales.filter((tarjetaId) => tarjetaId !== id)
        : [...actuales, id]
    );
  };

  // Realizar la compra simulada.
  const realizarCompra = () => {
    if (productosCarrito.length === 0) return;

    productosCarrito.forEach(({ producto, cantidad }) => {
      cambiarCantidad(producto, -cantidad);
    });

    setCarritoAbierto(false);
    setAvisoCompra(true);
  };

  // Ocultar automáticamente el aviso de compra.
  useEffect(() => {
    if (!avisoCompra) return;

    const temporizador = window.setTimeout(
      () => setAvisoCompra(false),
      2800
    );

    return () => window.clearTimeout(temporizador);
  }, [avisoCompra]);

  // Animación de los botones.
  const animarBoton = (elemento, escala) => {
    if (reducirMovimiento()) return;

    gsap.to(elemento, {
      scale: escala,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  // Zoom de las imágenes de los productos.
  const animarImagen = (evento, escala) => {
    if (reducirMovimiento()) return;

    const imagen = evento.currentTarget.querySelector(
      ".menu-imagen"
    );

    if (!imagen) return;

    gsap.to(imagen, {
      scale: escala,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Agregar un producto al carrito con una pequeña animación.
  const agregarProducto = (producto, elemento) => {
    cambiarCantidad(producto, 1);

    if (reducirMovimiento()) return;

    gsap.fromTo(
      elemento,
      { scale: 1 },
      {
        scale: 1.16,
        duration: 0.16,
        yoyo: true,
        repeat: 1,
        ease: "power1.out",
        overwrite: "auto",
      }
    );
  };

  return (
    <main className="menu-page" ref={menuRef}>
      <div className="menu-barra-superior">
        <div className="menu-marca" aria-label="Menú de brunch">
          Nuestro brunch
        </div>
      </div>

      {/* Botón flotante del carrito */}
      <button
        type="button"
        className="menu-carrito-flotante"
        onClick={() =>
          setCarritoAbierto((abierto) => !abierto)
        }
        aria-label={`Abrir carrito. ${totalUnidades} productos`}
        aria-expanded={carritoAbierto}
      >
        <svg
          className="menu-carrito-icono"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1.2" />
          <circle cx="18" cy="20" r="1.2" />
        </svg>

        <span className="menu-carrito-flotante-texto">
          Carrito
        </span>

        <span className="menu-carrito-contador">
          {totalUnidades}
        </span>
      </button>

      {/* Notificación de compra */}
      {avisoCompra && (
        <div className="menu-aviso-compra" role="status">
          <span aria-hidden="true">✓</span>
          Compra realizada correctamente
        </div>
      )}

      {/* Panel del carrito */}
      {carritoAbierto && (
        <aside
          className="menu-carrito-panel-flotante"
          aria-label="Contenido del carrito"
        >
          <div className="menu-carrito-cabecera">
            <h2>Tu carrito</h2>

            <button
              type="button"
              className="menu-carrito-cerrar"
              onClick={() => setCarritoAbierto(false)}
              aria-label="Cerrar carrito"
            >
              ×
            </button>
          </div>

          {productosCarrito.length === 0 ? (
            <p className="menu-carrito-vacio">
              Tu carrito está vacío. Agrega tus platos favoritos.
            </p>
          ) : (
            <>
              <ul className="menu-carrito-lista">
                {productosCarrito.map(({ producto, cantidad }) => (
                  <li
                    className="menu-carrito-item"
                    key={producto.id}
                  >
                    <img src={producto.imagen} alt="" />

                    <div className="menu-carrito-detalle">
                      <strong>{producto.nombre}</strong>

                      <span>
                        {formatoPrecio(producto.precio)}
                      </span>

                      <div className="menu-controles-cantidad menu-controles-carrito">
                        <button
                          type="button"
                          onClick={() =>
                            cambiarCantidad(producto, -1)
                          }
                          aria-label={`Quitar una unidad de ${producto.nombre}`}
                        >
                          −
                        </button>

                        <span>{cantidad}</span>

                        <button
                          type="button"
                          onClick={() =>
                            cambiarCantidad(producto, 1)
                          }
                          aria-label={`Agregar una unidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="menu-carrito-total">
                <span>Total</span>
                <strong>{formatoPrecio(totalPrecio)}</strong>
              </div>

              <button
                type="button"
                className="menu-realizar-compra"
                onClick={realizarCompra}
              >
                Realizar compra
              </button>
            </>
          )}
        </aside>
      )}

      {/* Encabezado del menú */}
      <section
        className="menu-encabezado"
        ref={encabezadoRef}
      >
        <p className="menu-eyebrow">
          SABORES PARA DISFRUTAR SIN PRISA
        </p>

        <h1 className="menu-titulo">
          Nuestro menú
        </h1>

        <p className="menu-subtitulo">
          Conoce nuestras opciones de brunch
        </p>

        {/* Buscador */}
        <div className="menu-buscador">
          <input
            type="search"
            placeholder="Buscar un plato..."
            aria-label="Buscar un plato"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setCantidadVisible(6);
              setTarjetasGiradas([]);
            }}
          />
        </div>

        {/* Filtros */}
        <div
          className="menu-categorias"
          aria-label="Filtrar por categoría"
        >
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              className={`menu-filtro ${
                categoriaActiva === categoria ? "activo" : ""
              }`}
              onClick={() => cambiarCategoria(categoria)}
              aria-pressed={categoriaActiva === categoria}
            >
              {categoria}
            </button>
          ))}
        </div>
      </section>

      {/* Productos */}
      <section
        className="menu-productos"
        aria-label="Productos del menú"
        ref={tarjetasRef}
      >
        {productosVisibles.length > 0 ? (
          productosVisibles.map((producto) => {
            const girada = tarjetasGiradas.includes(producto.id);

            const cantidad =
              carrito[producto.id]?.cantidad || 0;

            return (
              <article
                className={`menu-tarjeta ${
                  girada ? "girada" : ""
                }`}
                key={producto.id}
                onMouseEnter={(evento) =>
                  animarImagen(evento, 1.055)
                }
                onMouseLeave={(evento) => {
                  animarImagen(evento, 1);

                  if (
                    window.matchMedia(
                      "(hover: hover) and (pointer: fine)"
                    ).matches
                  ) {
                    setTarjetasGiradas((actuales) =>
                      actuales.filter(
                        (id) => id !== producto.id
                      )
                    );
                  }
                }}
              >
                <div className="menu-tarjeta-interior">
                  {/* Cara frontal */}
                  <div className="menu-cara menu-cara-frontal">
                    <button
                      type="button"
                      className="menu-cara-clic"
                      onClick={() =>
                        alternarTarjeta(producto.id)
                      }
                      aria-label={`Ver descripción de ${producto.nombre}`}
                    >
                      <div className="menu-imagen-contenedor">
                        {producto.etiqueta && (
                          <span className="menu-etiqueta">
                            {producto.etiqueta}
                          </span>
                        )}

                        <img
                          className="menu-imagen"
                          src={producto.imagen}
                          alt={producto.nombre}
                          loading="lazy"
                        />
                      </div>

                      <div className="menu-info">
                        <span className="menu-categoria-producto">
                          {producto.categoria}
                        </span>

                        <h2>{producto.nombre}</h2>

                        <p className="menu-precio">
                          {formatoPrecio(producto.precio)}
                        </p>
                      </div>
                    </button>

                    <div className="menu-tarjeta-pie">
                      <span className="menu-cantidad-etiqueta">
                        Cantidad
                      </span>

                      <div className="menu-controles-cantidad">
                        <button
                          type="button"
                          onClick={() =>
                            cambiarCantidad(producto, -1)
                          }
                          disabled={cantidad === 0}
                          aria-label={`Quitar una unidad de ${producto.nombre}`}
                        >
                          −
                        </button>

                        <span aria-live="polite">
                          {cantidad}
                        </span>

                        <button
                          type="button"
                          onClick={(evento) =>
                            agregarProducto(
                              producto,
                              evento.currentTarget
                            )
                          }
                          aria-label={`Agregar una unidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cara trasera */}
                  <div className="menu-cara menu-cara-trasera">
                    <span className="menu-categoria-producto">
                      {producto.categoria}
                    </span>

                    <h2>{producto.nombre}</h2>

                    <p className="menu-descripcion">
                      {producto.descripcion}
                    </p>

                    <div className="menu-ingredientes">
                      <h3>Ingredientes</h3>

                      <ul>
                        {(producto.ingredientes || []).map(
                          (ingrediente) => (
                            <li key={ingrediente}>
                              {ingrediente}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="menu-tarjeta-pie">
                      <span className="menu-cantidad-etiqueta">
                        Cantidad
                      </span>

                      <div className="menu-controles-cantidad">
                        <button
                          type="button"
                          onClick={() =>
                            cambiarCantidad(producto, -1)
                          }
                          disabled={cantidad === 0}
                          aria-label={`Quitar una unidad de ${producto.nombre}`}
                        >
                          −
                        </button>

                        <span aria-live="polite">
                          {cantidad}
                        </span>

                        <button
                          type="button"
                          onClick={(evento) =>
                            agregarProducto(
                              producto,
                              evento.currentTarget
                            )
                          }
                          aria-label={`Agregar una unidad de ${producto.nombre}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <p className="menu-sin-resultados">
            No encontramos productos con esa búsqueda.
          </p>
        )}
      </section>

      {/* Botón para cargar más productos */}
      {productosVisibles.length < productosFiltrados.length && (
        <div className="menu-cargar-contenedor">
          <button
            className="menu-cargar"
            type="button"
            onClick={() =>
              setCantidadVisible((cantidad) => cantidad + 3)
            }
            onMouseEnter={(e) =>
              animarBoton(e.currentTarget, 1.04)
            }
            onMouseLeave={(e) =>
              animarBoton(e.currentTarget, 1)
            }
          >
            Cargar más
          </button>
        </div>
      )}
    </main>
  );
}

export default Menu;
