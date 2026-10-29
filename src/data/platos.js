import pancakesImg from '../assets/images/pancakes.png'
import wafflesImg from '../assets/images/waffles.png'
import huevosImg from '../assets/images/huevos-benedictinos.png'
import tostadasImg from '../assets/images/tostadas-francesas.png'
import sandwichImg from '../assets/images/sandwich-brunch.png'

export const platos = [
    {
        id: 1,
        nombre: "Pancakes",
        precio: 18000,
        imagen: pancakesImg,
        descripcion: 'Pancakes esponjosos acompañados de frutas frescas y miel.'
    },
    {
        id: 2,
        nombre: "Waffles",
        precio: 20000,
        imagen: wafflesImg,
        descripcion: 'Waffles dorados y crujientes acompañados de fresas y crema.'
    },
    {
        id: 3,
        nombre: "Huevos benedictinos",
        precio: 25000,
        imagen: huevosImg,
        descripcion: 'Huevos pochados sobre pan tostado, acompañados de salsa holandesa.'
    },
    {
        id: 4,
        nombre: 'Tostadas francesas',
        precio: 22000,
        imagen: tostadasImg,
        descripcion: 'Tostadas doradas con canela, frutas frescas y un toque de miel.'
    },
    {
        id: 5,
        nombre: 'Sándwich brunch',
        precio: 24000,
        imagen: sandwichImg,
        descripcion: 'Sándwich de pan artesanal con huevo, aguacate, queso y vegetales.'
    }
]