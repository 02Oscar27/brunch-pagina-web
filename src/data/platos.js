import pancakesImg from '../assets/images/pancakes.png'
import wafflesImg from '../assets/images/waffles.png'
import huevosImg from '../assets/images/huevos-benedictinos.png'
import croasant from '../assets/images/croasant.png'
import bolfrutas from '../assets/images/bolfrutas.png'
import cafe from '../assets/images/cafe.png'
import francesas from '../assets/images/tostadasFrancesas.png'
import chocolate from '../assets/images/chocolate.png'
import sandwich from '../assets/images/sandwich-brunch.png'
import tostadasDestacadasImg from '../assets/images/tostadas-francesas.png'

// Catálogo único: tanto el Menú como Inicio consultan los precios desde aquí.
export const productos = [
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
    imagen: chocolate,
    etiqueta: "",
    descripcion: "Bebida caliente, cremosa y reconfortante.",
    ingredientes: ["Leche", "Chocolate", "Azúcar"],
  },
  {
    id: 9,
    nombre: "Sándwich brunch",
    categoria: "Desayunos",
    precio: 24000,
    imagen: sandwich,
    etiqueta: "Nuevo",
    descripcion: "Sándwich de pan artesanal con huevo, aguacate, queso y vegetales.",
    ingredientes: [  "Pan artesanal", "Huevo frito","Aguacate","Tomate","Espinaca","Queso"],
  },
];

// El carrusel conserva sus imágenes y descripciones originales,
// pero obtiene el nombre y el precio del catálogo compartido.
const destacados = [
  {
    id: 1,
    imagen: pancakesImg,
    descripcion: 'Pancakes esponjosos acompañados de frutas frescas y miel.'
  },
  {
    id: 2,
    imagen: wafflesImg,
    descripcion: 'Waffles dorados y crujientes acompañados de fresas y crema.'
  },
  {
    id: 3,
    imagen: huevosImg,
    descripcion: 'Huevos pochados sobre pan tostado, acompañados de salsa holandesa.'
  },
  {
    id: 7,
    imagen: tostadasDestacadasImg,
    descripcion: 'Tostadas doradas con canela, frutas frescas y un toque de miel.'
  },
  {
    id: 9,
    imagen: sandwich,
    descripcion: 'Sándwich de pan artesanal con huevo, aguacate, queso y vegetales.'
  }
]

export const platos = destacados.map(({ id, imagen, descripcion }) => {
  const producto = productos.find((item) => item.id === id)

  return {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    imagen,
    descripcion
  }
})
