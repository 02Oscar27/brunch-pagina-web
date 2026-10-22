import { useState } from "react";
import "../components/menu/Menu.css";

import pancakesImg from "../assets/images/pancakes.png";
import wafflesImg from "../assets/images/waffles.png";
import huevosImg from "../assets/images/huevos-benedictinos.png";
import brunchImg from "../assets/images/brunch-principal.png";

const productos = [
  {
    id: 1,
    nombre: "Pancakes",
    categoria: "Desayunos",
    precio: 18000,
    imagen: pancakesImg,
    etiqueta: "Más pedido",
    descripcion: "Esponjosos pancakes acompañados de sirope y fruta fresca.",
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
    descripcion: "Huevos preparados al estilo Benedictino para un brunch especial.",
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

function Menu() {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [cantidadVisible, setCantidadVisible] = useState(6);
  const [productoAbierto, setProductoAbierto] = useState(null);

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaActiva === "Todos" ||
      producto.categoria === categoriaActiva;

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  const productosVisibles = productosFiltrados.slice(0, cantidadVisible);

  const cambiarCategoria = (categoria) => {
    setCategoriaActiva(categoria);
    setCantidadVisible(6);
    setProductoAbierto(null);
  };

  const formatoPrecio = (precio) =>
    precio.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  return (
    <main className="menu-page">
      <section className="menu-encabezado">
        <h1>Nuestro menú</h1>
        <p className="menu-subtitulo">
          Conoce nuestras opciones de brunch
        </p>

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

      <section className="menu-productos" aria-label="Productos del menú">
        {productosVisibles.length > 0 ? (
          productosVisibles.map((producto) => (
            <article className="menu-tarjeta" key={producto.id}>
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

                <button
                  className="menu-ver-mas"
                  type="button"
                  aria-expanded={productoAbierto === producto.id}
                  onClick={() =>
                    setProductoAbierto(
                      productoAbierto === producto.id
                        ? null
                        : producto.id
                    )
                  }
                >
                  {productoAbierto === producto.id
                    ? "Ver menos"
                    : "Ver más"}
                </button>

                {productoAbierto === producto.id && (
                  <p className="menu-descripcion">
                    {producto.descripcion}
                  </p>
                )}
              </div>
            </article>
          ))
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
            onClick={() =>
              setCantidadVisible((cantidad) => cantidad + 3)
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
