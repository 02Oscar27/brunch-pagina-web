# Brunch — Página web

Sitio web responsive de un restaurante de brunch, desarrollado como **proyecto académico de la asignatura Lenguajes para la Web** del programa de Ingeniería de Software.

La aplicación permite explorar platos y precios, simular compras desde un carrito compartido, generar un comprobante imprimible, completar un formulario de reservas y consultar la ubicación de referencia y el clima de Neiva.

> **Alcance:** es una demostración de frontend. No registra pedidos o reservas reales, no procesa pagos y no emite facturas electrónicas.

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
| --- | --- |
| React | Componentes, estado e interfaces interactivas |
| Vite | Entorno de desarrollo y compilación |
| JavaScript y JSX | Lógica y estructura de los componentes |
| React Router DOM | Navegación entre las cinco páginas |
| Semantic UI React y CSS | Componentes visuales y estilos |
| GSAP y ScrollTrigger | Animaciones e interacciones al desplazarse |
| Open-Meteo | Consulta REST de temperatura y humedad |
| Google Maps | Mapa integrado de una zona de referencia |
| Git y GitHub | Versionamiento y trabajo colaborativo |

## Páginas

| Ruta | Página | Contenido principal |
| --- | --- | --- |
| `/` | Inicio | Presentación, carrusel de platos destacados y animaciones |
| `/menu` | Menú | Catálogo, categorías, búsqueda, ingredientes y cantidades |
| `/reservas` | Reservas | Formulario con validaciones y confirmación simulada |
| `/nosotros` | Nosotros | Historia, misión, visión y valores del restaurante |
| `/ubicacion` | Ubicación | Zona de referencia, Google Maps, horario y clima de Neiva |

## Funcionalidades principales

### Catálogo y carrito compartido

- Los productos incluyen nombre, descripción, categoría, ingredientes, imagen y precio en pesos colombianos.
- El catálogo de `src/data/platos.js` es la fuente de precios utilizada tanto en Inicio como en Menú.
- Es posible filtrar por categoría, buscar platos y aumentar o disminuir cantidades.
- El carrito se gestiona desde `App.jsx` y se puede abrir desde **dos accesos**: el Navbar y un botón flotante visible en las cinco páginas.
- Los dos accesos muestran los mismos productos y el mismo total.

### Compra y comprobante de demostración

- Al finalizar una compra simulada se genera un comprobante con fecha, referencia, productos, cantidades, subtotales y total.
- El comprobante puede imprimirse o guardarse como PDF utilizando la función de impresión del navegador.
- Es posible volver a consultar el último comprobante mientras permanezca abierta la aplicación.

**Importante:** no hay pasarela de pago, envío de pedidos ni facturación electrónica. El comprobante es exclusivamente académico y no tiene validez tributaria.

### Reservas

El formulario permite ingresar nombre, correo electrónico, teléfono, fecha, hora, número de personas y observaciones opcionales. Valida los datos antes de mostrar una confirmación en pantalla.

**Importante:** esta confirmación no crea una reserva en un restaurante ni guarda los datos en un servidor.

### Chatbot de preguntas frecuentes

Asistente con respuestas locales basadas en reglas. Orienta sobre el Menú, las reservas, los horarios, la ubicación, los pedidos y los pagos simulados. Algunas respuestas incluyen enlaces a las secciones correspondientes.

**No utiliza inteligencia artificial generativa ni una API de chatbot.**

### Ubicación y API meteorológica

- Se integra un mapa de Google Maps con **Neiva, Huila, Colombia** como ubicación de referencia. La dirección exacta del restaurante no está definida.
- `src/services/climaService.js` consulta la API pública de [Open-Meteo](https://open-meteo.com/) mediante `fetch`.
- El componente `ClimaBrunch.jsx` presenta temperatura y humedad, además de los estados de carga y error.
- Para visualizar el mapa y obtener datos meteorológicos se necesita conexión a internet.

### Diseño adaptable y animaciones

- Interfaz adaptable a computador, tableta y celular.
- Navbar con menú desplegable en pantallas pequeñas.
- Carrusel de platos con navegación manual, desplazamiento automático y tarjetas giratorias.
- Animaciones con GSAP y ScrollTrigger; algunas interacciones respetan la preferencia de movimiento reducido del dispositivo.

## Instalación y ejecución local

### Requisitos

- [Node.js](https://nodejs.org/) y npm compatibles con la versión de Vite utilizada.
- Git, si deseas clonar el repositorio.
- Un navegador web actualizado.

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/02Oscar27/brunch-pagina-web.git
   cd brunch-pagina-web
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador la dirección local que muestre Vite, normalmente `http://localhost:5173/`.

### Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el proyecto en modo desarrollo |
| `npm run lint` | Ejecuta las comprobaciones de ESLint |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Permite revisar localmente la compilación generada |

El proyecto no requiere configurar un servidor backend, una base de datos o credenciales para ejecutar sus funciones de demostración.

## Organización del código

```text
src/
├── App.jsx                    # Rutas, estado del carrito y comprobante
├── main.jsx                   # Punto de entrada y BrowserRouter
├── index.css                  # Variables y estilos generales
├── assets/
│   └── images/               # Imágenes del restaurante y los platos
├── components/
│   ├── Navbar.jsx            # Navegación y acceso al carrito
│   ├── CarritoFlotante.jsx    # Panel compartido del carrito
│   ├── FacturaCompra.jsx      # Comprobante simulado
│   ├── Chatbot.jsx            # Interfaz de preguntas frecuentes
│   ├── ClimaBrunch.jsx        # Datos meteorológicos
│   ├── PlatosDestacados.jsx   # Carrusel de Inicio
│   └── ...                   # Otros componentes y estilos
├── data/
│   ├── platos.js              # Productos y platos destacados
│   └── chatbotRespuestas.js   # Reglas de respuesta del chatbot
├── pages/
│   ├── Inicio.jsx
│   ├── Menu.jsx
│   ├── Reservas.jsx
│   ├── Nosotros.jsx
│   └── Ubicacion.jsx
└── services/
    └── climaService.js        # Solicitud HTTP a Open-Meteo
```

### ¿Cómo se organiza la lógica?

- **`App.jsx`:** mantiene el estado compartido del carrito y coordina la compra simulada y el comprobante.
- **`pages/`:** contiene las vistas correspondientes a cada ruta.
- **`components/`:** contiene elementos reutilizables como el Navbar, el carrito y el chatbot.
- **`data/`:** concentra el catálogo de productos y las reglas de respuestas.
- **`services/`:** separa la consulta HTTP del componente que presenta los resultados.

Esta separación ayuda a mantener la interfaz organizada y evita duplicar la lógica del carrito o los precios.

## Pruebas manuales recomendadas

Antes de una presentación se recomienda comprobar lo siguiente:

1. Recorrer las cinco páginas desde el Navbar, también en tamaño de pantalla móvil.
2. Filtrar el Menú y buscar un producto.
3. Agregar productos y verificar que los dos botones del carrito muestren las mismas cantidades.
4. Cambiar de página y comprobar que el carrito conserve su contenido durante la navegación.
5. Finalizar una compra simulada y revisar la impresión o guardado del comprobante en PDF.
6. Enviar un formulario de reservas válido e intentar otro con datos incorrectos.
7. Consultar la ubicación, el estado del clima y las respuestas del chatbot.
8. Ejecutar `npm run lint` y `npm run build`.

Estas son verificaciones manuales; este README no presupone que exista una suite de pruebas automatizadas.

## Limitaciones actuales

- Es una aplicación **solo frontend**, sin autenticación, backend ni base de datos.
- El carrito y el último comprobante se mantienen en memoria durante el uso; al recargar la página se pierde ese estado.
- Las reservas y compras son simulaciones; no generan operaciones reales.
- El chatbot responde mediante reglas predefinidas, no mediante un modelo de IA.
- La ubicación de Google Maps es de referencia, no una dirección comercial exacta.
- La información del clima depende de la disponibilidad de Open-Meteo y de la conexión a internet.

## Trabajo colaborativo

El código se organiza y versiona en GitHub mediante ramas y Pull Requests, lo que permite desarrollar cambios por separado, revisarlos y fusionarlos con la rama principal.

Repositorio: [02Oscar27/brunch-pagina-web](https://github.com/02Oscar27/brunch-pagina-web)

---

**Brunch** es un proyecto académico destinado a demostrar el desarrollo de interfaces web con React, la reutilización de componentes, la navegación entre páginas, las animaciones y el consumo de una API REST.
