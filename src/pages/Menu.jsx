import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../components/menu/Menu.css";
import pancakesImg from "../assets/images/pancakes.png";
import wafflesImg from "../assets/images/waffles.png";
import huevosImg from "../assets/images/huevos-benedictinos.png";
import brunchImg from "../assets/images/brunch-principal.png";
import croasant from "../assets/images/croasant.png";
import bolfrutas from "../assets/images/bolfrutas.png";
import cafe from "../assets/images/cafe.png";
import francesas from "../assets/images/tostadasFrancesas.png";
import chocolate from "../assets/images/chocolate.png";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const productos = [
  {
    id: 1,
    nombre: "Pancakes",
    categoria: "Desayunos",
    precio: 18000,
    imagen: pancakesImg,
    etiqueta: "Más pedido",
    descripcion:
      "Esponjosos pancakes acompañados de sirope y fruta fresca.",
    ingredientes: ["Harina de trigo", "Leche", "Huevo", "Mantequilla", "Sirope", "Fruta fresca"],
  },
  {
    id: 2,
    nombre: "Waffles",
    categoria: "Desayunos",
    precio: 20000,
    imagen: wafflesImg,
    etiqueta: "Nuevo",
    descripcion: "Waffles dorados ideales para comenzar el día.",
    ingredientes: ["Harina de trigo", "Leche", "Huevo", "Mantequilla", "Vainilla"],
  },
  {
    id: 3,
    nombre: "Huevos Benedictinos",
    categoria: "Desayunos",
    precio: 24000,
    imagen: huevosImg,
    etiqueta: "Más pedido",
    descripcion:
      "Huevos preparados al estilo Benedictino para un brunch especial.",
    ingredientes: ["Huevos pochados", "Pan tipo muffin", "Jamón", "Salsa holandesa", "Cebollín"],
  },
  {
    id: 4,
    nombre: "Croissant",
    categoria: "Desayunos",
    precio: 12000,
    imagen: croasant,
    etiqueta: "",
    descripcion: "Croissant de textura crujiente y centro suave.",
    ingredientes: ["Harina de trigo", "Mantequilla", "Levadura", "Leche", "Azúcar"],
  },
  {
    id: 5,
    nombre: "Bowl de frutas",
    categoria: "Dulces",
    precio: 16000,
    imagen: bolfrutas,
    etiqueta: "Nuevo",
    descripcion: "Una combinación fresca de frutas de temporada.",
    ingredientes: ["Fresas", "Banano", "Uvas", "Papaya", "Fruta de temporada"],
  },
  {
    id: 6,
    nombre: "Café",
    categoria: "Bebidas",
    precio: 7000,
    imagen: cafe,
    etiqueta: "Más pedido",
    descripcion: "Café aromático, perfecto para acompañar tu desayuno.",
    ingredientes: ["Café molido", "Agua"],
  },
  {
    id: 7,
    nombre: "Tostadas francesas",
    categoria: "Dulces",
    precio: 17000,
    imagen: francesas,
    etiqueta: "",
    descripcion: "Tostadas dulces con un toque especial de la casa.",
    ingredientes: ["Pan", "Huevo", "Leche", "Canela", "Mantequilla", "Miel"],
  },
  {
    id: 8,
    nombre: "Chocolate caliente",
    categoria: "Bebidas",
    precio: 8000,
    imagen: cafe,
    etiqueta: "",
    descripcion: "Bebida caliente, cremosa y reconfortante.",
    ingredientes: ["Leche", "Chocolate", "Azúcar"],
  },
  {
    id: 9,
    nombre: "Waffles con fruta",
    categoria: "Dulces",
    precio: 22000,
    imagen: wafflesImg,
    etiqueta: "Nuevo",
    descripcion: "Waffles acompañados de fruta y un toque dulce.",
    ingredientes: ["Harina de trigo", "Leche", "Huevo", "Mantequilla", "Fruta fresca", "Sirope"],
  },
];

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

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const elementos = gsap.utils.toArray(
        [".menu-titulo", ".menu-subtitulo", ".menu-buscador"],
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

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tarjetas = gsap.utils.toArray(
        ".menu-tarjeta",
        tarjetasRef.current
      );

      tarjetas.forEach((tarjeta) => {
        gsap.fromTo(
          tarjeta,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: tarjeta,
              start: "top 95%",
              once: true,
            },
          }
        );
      });
    },
    {
      scope: menuRef,
      dependencies: [categoriaActiva, busqueda, cantidadVisible],
      revertOnUpdate: true,
    }
  );

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todos" || producto.categoria === categoriaActiva;

    const termino = busqueda.trim().toLowerCase();
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(termino) ||
      producto.descripcion.toLowerCase().includes(termino) ||
      producto.ingredientes.some((ingrediente) =>
        ingrediente.toLowerCase().includes(termino)
      );

    return coincideCategoria && coincideBusqueda;
  });

  const productosVisibles = productosFiltrados.slice(0, cantidadVisible);

  const productosCarrito = Object.values(carrito);

  const totalUnidades = productosCarrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalPrecio = productosCarrito.reduce(
    (total, item) => total + item.producto.precio * item.cantidad,
    0
  );

  const formatoPrecio = (precio) =>
    precio.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const cambiarCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    setCantidadVisible(6);
  };

  const alternarTarjeta = (id) => {
    setTarjetasGiradas((actuales) =>
      actuales.includes(id)
        ? actuales.filter((tarjetaId) => tarjetaId !== id)
        : [...actuales, id]
    );
  };

  const realizarCompra = () => {
    if (productosCarrito.length === 0) return;

    productosCarrito.forEach(({ producto, cantidad }) => {
      cambiarCantidad(producto, -cantidad);
    });

    setCarritoAbierto(false);
    setAvisoCompra(true);
  };

  useEffect(() => {
    if (!avisoCompra) return;
    const temporizador = window.setTimeout(() => setAvisoCompra(false), 2800);
    return () => window.clearTimeout(temporizador);
  }, [avisoCompra]);

  const animarBoton = (elemento, escala) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.to(elemento, {
      scale: escala,
      duration: 0.2,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  return (
    <main className="menu-page" ref={menuRef}>
      <div className="menu-barra-superior">
        <div className="menu-marca" aria-label="Menú de brunch">
          Nuestro brunch
        </div>
      </div>

      <button
        type="button"
        className="menu-carrito-flotante"
        onClick={() => setCarritoAbierto((abierto) => !abierto)}
        aria-label={`Abrir carrito. ${totalUnidades} productos`}
        aria-expanded={carritoAbierto}
      >
        <svg className="menu-carrito-icono" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
          <circle cx="10" cy="20" r="1.2" />
          <circle cx="18" cy="20" r="1.2" />
        </svg>
        <span className="menu-carrito-flotante-texto">Carrito</span>
        <span className="menu-carrito-contador">{totalUnidades}</span>
      </button>

      {avisoCompra && (
        <div className="menu-aviso-compra" role="status">
          <span aria-hidden="true">✓</span> Compra realizada correctamente
        </div>
      )}

      {carritoAbierto && (
        <aside className="menu-carrito-panel-flotante" aria-label="Contenido del carrito">
          <div className="menu-carrito-cabecera">
            <h2>Tu carrito</h2>
            <button
              type="button"
              className="menu-carrito-cerrar"
              onClick={() => setCarritoAbierto(false)}
              aria-label="Cerrar carrito"
            >×</button>
          </div>

          {productosCarrito.length === 0 ? (
            <p className="menu-carrito-vacio">Tu carrito está vacío. Agrega tus platos favoritos.</p>
          ) : (
            <>
              <ul className="menu-carrito-lista">
                {productosCarrito.map(({ producto, cantidad }) => (
                  <li className="menu-carrito-item" key={producto.id}>
                    <img src={producto.imagen} alt="" />
                    <div className="menu-carrito-detalle">
                      <strong>{producto.nombre}</strong>
                      <span>{formatoPrecio(producto.precio)}</span>
                      <div className="menu-controles-cantidad menu-controles-carrito">
                        <button type="button" onClick={() => cambiarCantidad(producto, -1)} aria-label={`Quitar una unidad de ${producto.nombre}`}>−</button>
                        <span>{cantidad}</span>
                        <button type="button" onClick={() => cambiarCantidad(producto, 1)} aria-label={`Agregar una unidad de ${producto.nombre}`}>+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="menu-carrito-total">
                <span>Total</span>
                <strong>{formatoPrecio(totalPrecio)}</strong>
              </div>
              <button type="button" className="menu-realizar-compra" onClick={realizarCompra}>
                Realizar compra
              </button>
            </>
          )}
        </aside>
      )}

      <section className="menu-encabezado" ref={encabezadoRef}>
        <h1 className="menu-titulo">Nuestro menú</h1>
        <p className="menu-subtitulo">Conoce nuestras opciones de brunch</p>

        <div className="menu-buscador">
          <input
            type="search"
            placeholder="Buscar un plato..."
            aria-label="Buscar un plato"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setCantidadVisible(6);
            }}
          />
        </div>

        <div className="menu-categorias" aria-label="Filtrar por categoría">
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

      <section
        className="menu-productos"
        aria-label="Productos del menú"
        ref={tarjetasRef}
      >
        {productosVisibles.length > 0 ? (
          productosVisibles.map((producto) => {
            const girada = tarjetasGiradas.includes(producto.id);
            const cantidad = carrito[producto.id]?.cantidad || 0;

            return (
              <article
                className={`menu-tarjeta ${girada ? "girada" : ""}`}
                key={producto.id}
                onMouseLeave={() => {
                  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                    setTarjetasGiradas((actuales) => actuales.filter((id) => id !== producto.id));
                  }
                }}
              >
                <div className="menu-tarjeta-interior">
                  <div className="menu-cara menu-cara-frontal">
                    <button
                      type="button"
                      className="menu-cara-clic"
                      onClick={() => alternarTarjeta(producto.id)}
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
                      <span className="menu-cantidad-etiqueta">Cantidad</span>
                      <div className="menu-controles-cantidad">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(producto, -1)}
                          disabled={cantidad === 0}
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
                  </div>

                  <div className="menu-cara menu-cara-trasera">
                    <span className="menu-categoria-producto">
                      {producto.categoria}
                    </span>
                    <h2>{producto.nombre}</h2>
                    <p className="menu-descripcion">{producto.descripcion}</p>
                    <div className="menu-ingredientes">
                      <h3>Ingredientes</h3>
                      <ul>
                        {producto.ingredientes.map((ingrediente) => (
                          <li key={ingrediente}>{ingrediente}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="menu-tarjeta-pie">
                      <span className="menu-cantidad-etiqueta">Cantidad</span>
                      <div className="menu-controles-cantidad">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(producto, -1)}
                          disabled={cantidad === 0}
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

      {productosVisibles.length < productosFiltrados.length && (
        <div className="menu-cargar-contenedor">
          <button
            className="menu-cargar"
            type="button"
            onClick={() => setCantidadVisible((cantidad) => cantidad + 3)}
            onMouseEnter={(e) => animarBoton(e.currentTarget, 1.04)}
            onMouseLeave={(e) => animarBoton(e.currentTarget, 1)}
          >
            Cargar más
          </button>
        </div>
      )}
    </main>
  );
}

export default Menu;
