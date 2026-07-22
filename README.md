# 🎬 Pepeflix

Pepeflix es un proyecto personal desarrollado con Next.js y la API de TMDB como parte de mi aprendizaje continuo en desarrollo Full Stack. Permite descubrir películas, realizar búsquedas, guardar favoritas y consultar información detallada junto con sus tráilers.


## Vista previa

![Vista principal de Pepeflix](./public/01-landing-experience.png)

---

## Características

- Exploración de las películas más populares de TMDB.
- Búsqueda de películas por título o por ID de TMDB.
- Ficha detallada con sinopsis, puntuación, géneros, duración, año y tráiler.
- Sistema de tráilers con selección automática de oficial, teaser o vídeo manual de respaldo.
- Sistema de favoritas con persistencia en `localStorage` a través de Zustand.
- Sistema de comentarios por película, con creación, edición y borrado (con confirmación).
- Navegación mediante teclado con foco visible en los elementos interactivos.
- Diseño responsive para móvil, tablet y escritorio.
- Obtención de datos en el servidor mediante Server Components.
- Páginas dedicadas para errores de la API y rutas o IDs inexistentes.

---

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Next.js | 16.2.3 | Framework principal (App Router) |
| React | 19.2.4 | Componentes y lógica de la interfaz |
| Tailwind CSS | 4 | Estilos y diseño responsive |
| Zustand | 5.0.12 | Estado global de las películas favoritas |
| TMDB API | — | Datos, imágenes y vídeos de películas |
| ESLint | 9 | Calidad y consistencia del código |

No se utiliza ninguna librería de iconos: los iconos (buscar, favorito, menú) están definidos como SVG en línea dentro de los propios componentes.

---

## Primeros pasos

### 1. Clona el repositorio

```bash
git clone https://github.com/hjr-dev/Pepeflix.git
cd Pepeflix
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura la API de TMDB

Crea una cuenta en **The Movie Database (TMDB)** y obtén una API Key desde su página de configuración:

https://www.themoviedb.org/settings/api

Después, crea un archivo `.env.local` en la raíz del proyecto con la siguiente variable:

```env
API_KEY=tu_api_key_de_tmdb
```

> Puedes usar el archivo `.env.example` incluido en el repositorio como referencia.

### 4. Ejecuta el proyecto

```bash
npm run dev
```

Abre la aplicación en:

```
http://localhost:3000
```

### Otros comandos disponibles

```bash
npm run build   # Genera la build de producción
npm run start   # Sirve la build de producción
npm run lint    # Ejecuta ESLint sobre el proyecto
```

---

## Arquitectura del proyecto

El proyecto utiliza el **App Router** de Next.js, separando la obtención de datos en el servidor de las funcionalidades interactivas en el cliente.

- **Server Components** (la página de inicio, la ficha de película y la búsqueda) obtienen los datos de TMDB directamente en el servidor.
- **Client Components** (`Navbar`, `BarraBusqueda`, `Like`, `CajaComentarios`, `ContenedorPelisFavs`, `HydrateFavoritas`) gestionan la interacción, el estado y el acceso a APIs del navegador como `localStorage`.
- **Zustand** gestiona el estado global de las películas favoritas, con persistencia en `localStorage` y una hidratación controlada mediante `skipHydration` para evitar diferencias entre el HTML del servidor y el estado del cliente.
- **Route Handlers** implementan dos APIs propias:
  - `app/api/comentarios/route.js`: operaciones CRUD (`GET`, `POST`, `PUT`, `DELETE`) sobre los comentarios.
  - `app/api/peliculas/route.js`: recibe una lista de IDs favoritos y devuelve sus datos de TMDB en una sola petición desde el cliente.
- **`error.jsx` y `not-found.jsx`** gestionan fallos de la API de TMDB, rutas inexistentes e IDs de película no válidos.

---

## Estructura del proyecto

```text
pepeflix/
├── app/
│   ├── api/
│   │   ├── comentarios/route.js
│   │   └── peliculas/route.js
│   ├── buscar/page.jsx
│   ├── favoritas/page.jsx
│   ├── pelicula/[id]/page.jsx
│   ├── error.jsx
│   ├── not-found.jsx
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   ├── BarraBusqueda.jsx
│   ├── CajaComentarios.jsx
│   ├── ContenedorPelis.jsx
│   ├── ContenedorPelisFavs.jsx
│   ├── FichaPeliculaComponente.jsx
│   ├── Footer.jsx
│   ├── HeroBanner.jsx
│   ├── HydrateFavoritas.jsx
│   ├── Like.jsx
│   ├── Navbar.jsx
│   └── TarjetaPeli.jsx
│
├── lib/
│   ├── tmdbApi.js
│   └── tmdbConfig.js
│
├── data/
│   ├── comentarios.json
│   └── trailers.json
│
├── store/
│   └── useFavoritasStorage.js
│
└── public/
    ├── 01-landing-experience.png
    ├── 02-content-discovery.png
    ├── 03-smart-search.png
    ├── 04-movie-details.png
    ├── 05-integrated-trailer.png
    ├── 06-personal-collection.png
    ├── 07-responsive-experience.png
    └── poster-not-found.svg
```

---

## Integración con TMDB

Todas las peticiones a TMDB pasan por `lib/tmdbApi.js` y `lib/tmdbConfig.js`, que centralizan la URL base, la API key y los parámetros de idioma (`es-ES`) y región (`ES`).

Las imágenes se construyen así:

```text
https://image.tmdb.org/t/p/TAMAÑO + poster_path
```

Los tamaños que realmente se usan en el proyecto son:

| Tamaño | Uso |
|--------|-----|
| `w342` | Posters del mosaico del Hero de la página de inicio |
| `w500` | Posters de las tarjetas de película y de la ficha detallada |
| `original` | Imagen de fondo (backdrop) de la ficha de película |

Cuando una película no tiene sinopsis en español, la aplicación repite la petición en inglés (`en-US`) como idioma de respaldo antes de mostrar un mensaje genérico ("Sinopsis no disponible").

Este producto usa la API de TMDB, pero no está respaldado ni certificado por TMDB.

---

## Descubrimiento de contenido

La página de inicio muestra un Hero con un mosaico de posters de las películas más populares y una cuadrícula con esas mismas películas, obtenidas en el servidor con `fetchPeliculasPopulares`.

![Descubrimiento de contenido](./public/02-content-discovery.png)

---

## Búsqueda de películas

La página `/buscar` permite alternar entre dos modos mediante parámetros en la URL:

- **Por nombre** (`?q=`): busca por título usando el endpoint de búsqueda de TMDB.
- **Por ID** (`?id=` o `?modo=id`): busca una película concreta por su ID numérico de TMDB.

La interfaz gestiona además los estados de "sin resultados" y de "ID no encontrado".

![Búsqueda de películas por nombre o ID](./public/03-smart-search.png)

---

## Detalle de película

La ficha de cada película (`/pelicula/[id]`) muestra el backdrop, el poster, el título, el tagline (si existe), el año, la duración, la puntuación con estrellas, los géneros, la sinopsis, el tráiler y la sección de comentarios. Si el ID no corresponde a ninguna película existente en TMDB, se muestra la página de error 404.

![Detalle de película](./public/04-movie-details.png)

---

## Sistema de tráilers

Cuando una película tiene varios vídeos disponibles en TMDB, la aplicación elige uno siguiendo este orden de prioridad:

1. Tráiler oficial de TMDB (`type: "Trailer"`, `site: "YouTube"`).
2. Teaser de TMDB (`type: "Teaser"`, `site: "YouTube"`).
3. Vídeo definido manualmente en `data/trailers.json`, si existe una entrada para ese ID.

Si no hay ningún vídeo disponible, la ficha muestra un mensaje indicándolo en lugar del reproductor.

El fichero de respaldo manual asocia un ID de película de TMDB con un ID de vídeo de YouTube:

```json
{
  "27205": "cdx31ak4KbQ"
}
```

Actualmente el archivo está vacío (`{}`); solo se usa cuando se quiere forzar manualmente un tráiler para una película concreta.

![Tráiler integrado en la ficha de película](./public/05-integrated-trailer.png)

---

## Favoritas

Las películas favoritas se gestionan con Zustand (`store/useFavoritasStorage.js`) y se guardan únicamente en el `localStorage` del navegador: no existe persistencia en servidor ni base de datos.

Como el servidor no tiene acceso a `localStorage`, el store se crea con `skipHydration: true` y se rehidrata manualmente desde `HydrateFavoritas` cuando el componente se monta en el cliente. Hasta que esa rehidratación termina, el corazón de "favorita" se muestra como no marcado para que coincida con el HTML generado en el servidor y evitar parpadeos.

La página `/favoritas` envía los IDs guardados al endpoint `POST /api/peliculas`, que los resuelve en paralelo contra TMDB y devuelve los datos completos de cada película.

![Colección de películas favoritas](./public/06-personal-collection.png)

---

## Sistema de comentarios

Cada ficha de película incluye una sección de comentarios gestionada por `app/api/comentarios/route.js`, con las siguientes operaciones:

- `GET /api/comentarios?peliId=` — obtiene los comentarios de una película.
- `POST /api/comentarios` — crea un comentario nuevo.
- `PUT /api/comentarios` — edita un comentario existente.
- `DELETE /api/comentarios?id=` — borra un comentario, previa confirmación del usuario.

Los comentarios se guardan en `data/comentarios.json`, leyendo y escribiendo directamente en el sistema de archivos del servidor. Esta solución solo funciona en local o en un entorno de desarrollo: en un despliegue serverless (por ejemplo, en Vercel) el sistema de archivos no es persistente entre peticiones, por lo que los comentarios no sobrevivirían de forma fiable en producción. Para eso haría falta una base de datos o un servicio de almacenamiento externo.

---

## Experiencia responsive y accesibilidad

La cuadrícula de películas se adapta de 2 columnas en móvil hasta 5 en pantallas grandes, y la barra de navegación pasa a un menú de hamburguesa en tamaños pequeños.

En cuanto a accesibilidad, los elementos interactivos (like, buscar, editar/borrar comentario, menú móvil) tienen `aria-label` cuando no llevan texto visible, todos usan enlaces o botones semánticos, y llevan estilos de foco visibles (`focus-visible:ring`) para la navegación por teclado. Esto no implica una certificación de accesibilidad ni cumplimiento formal de WCAG, sino un cuidado básico en estos puntos.

![Experiencia en móvil](./public/07-responsive-experience.png)

---

## Gestión de errores

- `app/not-found.jsx` se muestra para rutas inexistentes y para IDs de película que no existen en TMDB (la ficha llama a `notFound()` cuando la respuesta no trae un `id` válido).
- `app/error.jsx` captura errores inesperados (por ejemplo, un fallo de la API de TMDB) y ofrece un botón para reintentar y otro para volver al inicio.
- La búsqueda por nombre y por ID gestiona explícitamente el caso de "sin resultados" y "ID no encontrado" sin lanzar un error.

---

## Decisiones técnicas

### Selección de tráiler

No todas las películas tienen tráiler oficial en TMDB. Para evitar fichas sin contenido audiovisual, se implementó la prioridad tráiler → teaser → vídeo manual descrita más arriba.

### Server Components y Client Components

Uno de los retos fue separar bien qué se ejecuta en el servidor y qué necesita el navegador. Los datos de TMDB se obtienen en Server Components, mientras que las favoritas, los comentarios y otras interacciones viven en Client Components.

### Persistencia e hidratación de favoritas

El servidor no puede leer `localStorage`, así que el primer render no sabe qué películas están guardadas como favoritas. Se usó `skipHydration` de Zustand junto con una rehidratación manual en el cliente para evitar diferencias entre el HTML del servidor y el estado real del navegador.

### Sinopsis de respaldo

Algunas películas no tienen sinopsis traducida al español en TMDB. Para no dejar la ficha vacía, se repite la petición en inglés como idioma de respaldo antes de mostrar un texto genérico.

### Comentarios en JSON

Guardar los comentarios en un archivo JSON fue una forma sencilla de tener un CRUD funcional sin montar una base de datos, asumiendo que el proyecto se ejecuta en local o en un entorno con sistema de archivos persistente.

### Accesibilidad

Se cuidó la navegación por teclado, el foco visible y el uso de elementos interactivos semánticos para no depender del ratón.

---

## ¿Hablamos?

Este proyecto forma parte de mi portfolio personal y refleja mi proceso de aprendizaje continuo en desarrollo Full Stack.

Si tienes algún comentario, sugerencia o simplemente quieres conectar, puedes enviarme un mensaje a través de GitHub.

