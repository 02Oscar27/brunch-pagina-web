import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "../components/menu/Menu.css";
import pancakesImg from "../assets/images/pancakes.png";
import wafflesImg from "../assets/images/waffles.png";
import huevosImg from "../assets/images/huevos-benedictinos.png";
import brunchImg from "../assets/images/brunch-principal.png";

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
  },
  {
    id: 2,
    nombre: "Waffles",
    categoria: "Desayunos",
    precio: 20000,
    imagen: wafflesImg,
    etiqueta: "Nuevo",
    descripcion: "Waffles dorados ideales para comenzar el día.",
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
  },
  {
    id: 4,
    nombre: "Croissant",
    categoria: "Desayunos",
    precio: 12000,
    imagen: brunchImg,
    etiqueta: "",
    descripcion: "Croissant de textura crujiente y centro suave.",
  },
  {
    id: 5,
    nombre: "Bowl de frutas",
    categoria: "Dulces",
    precio: 16000,
    imagen: brunchImg,
    etiqueta: "Nuevo",
    descripcion: "Una combinación fresca de frutas de temporada.",
  },
  {
    id: 6,
    nombre: "Café",
    categoria: "Bebidas",
    precio: 7000,
    imagen: brunchImg,
    etiqueta: "Más pedido",
    descripcion: "Café aromático, perfecto para acompañar tu desayuno.",
  },
  {
    id: 7,
    nombre: "Tostadas francesas",
    categoria: "Dulces",
    precio: 17000,
    imagen: pancakesImg,
    etiqueta: "",
    descripcion: "Tostadas dulces con un toque especial de la casa.",
  },
  {
    id: 8,
    nombre: "Chocolate caliente",
    categoria: "Bebidas",
    precio: 8000,
    imagen: brunchImg,
    etiqueta: "",
    descripcion: "Bebida caliente, cremosa y reconfortante.",
  },
  {
    id: 9,
    nombre: "Waffles con fruta",
    categoria: "Dulces",
    precio: 22000,
    imagen: wafflesImg,
    etiqueta: "Nuevo",
    descripcion: "Waffles acompañados de fruta y un toque dulce.",
  },
];

const categorias = ["Todos", "Desayunos", "Dulces", "Bebidas"];

function Menu({ carrito = {}, cambiarCantidad }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [cantidadVisible, setCantidadVisible] = useState(6);
  const [tarjetasGiradas, setTarjetasGiradas] = useState([]);

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
      producto.descripcion.toLowerCase().includes(termino);

    return coincideCategoria && coincideBusqueda;
  });

  const productosVisibles = productosFiltrados.slice(0, cantidadVisible);

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
                        <span className="menu-indicacion-giro">
                          Dar clic para ver descripción ↻
                        </span>
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

                    <div className="menu-tarjeta-pie" onClick={(e) => e.stopPropagation()}>
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

                  <div
                    className="menu-cara menu-cara-trasera"
                    onClick={() => alternarTarjeta(producto.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        alternarTarjeta(producto.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Dar clic para volver a la imagen de ${producto.nombre}`}
                  >
                    <span className="menu-categoria-producto">
                      {producto.categoria}
                    </span>
                    <h2>{producto.nombre}</h2>
                    <p className="menu-descripcion">{producto.descripcion}</p>
                    <p className="menu-precio">
                      {formatoPrecio(producto.precio)}
                    </p>

                    <span className="menu-indicacion-volver">
                      Volver a la imagen ↻
                    </span>

                    <div className="menu-tarjeta-pie" onClick={(e) => e.stopPropagation()}>
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
