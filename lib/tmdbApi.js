import {
  buildTmdbUrl,
  DEFAULT_OVERVIEW,
  TMDB_FALLBACK_LANGUAGE,
  TMDB_LANGUAGE,
  TMDB_REGION,
} from "@/lib/tmdbConfig";

async function fetchDetallesPelicula(idPeli, language = TMDB_LANGUAGE, params = {}) {
  const res = await fetch(
    buildTmdbUrl(`/movie/${idPeli}`, {
      language,
      ...params,
    }),
  );

  return res.json();
}

function hasOverview(overview) {
  return typeof overview === "string" && overview.trim().length > 0;
}

async function withOverviewFallback(peli) {
  if (!peli?.id) return peli;

  if (hasOverview(peli.overview)) {
    return peli;
  }

  const fallback = await fetchDetallesPelicula(peli.id, TMDB_FALLBACK_LANGUAGE);

  return {
    ...peli,
    overview: hasOverview(fallback?.overview) ? fallback.overview : DEFAULT_OVERVIEW,
  };
}

export async function fetchPeliculasPopulares() {
  try {
    const res = await fetch(
      buildTmdbUrl("/movie/popular", {
        language: TMDB_LANGUAGE,
        region: TMDB_REGION,
      }),
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

// Trae los datos de una película
export async function fetchPelicula(idPeli) {
  try {
    const data = await fetchDetallesPelicula(idPeli);
    console.log(data);
    return withOverviewFallback(data);
  } catch (error) {
    console.error("Error en la petición: ", error);
  }
}

// Trae los vídeos de las pelis
export async function fetchPeliTrailer(idPeli) {
  try {
    const data = await fetchDetallesPelicula(idPeli, TMDB_LANGUAGE, {
      append_to_response: "videos",
    });
    const allTrailers = data.videos?.results ?? [];

    // Prioridad: tráiler oficial > teaser > override manual (data/trailers.json)
    const trailer =
      allTrailers.find((video) => video.type === "Trailer" && video.site === "YouTube") ??
      allTrailers.find((video) => video.type === "Teaser" && video.site === "YouTube");

    if (trailer) return trailer;

    const trailersOverride = (await import("@/data/trailers.json")).default;
    const overrideKey = trailersOverride[idPeli];
    return overrideKey ? { key: overrideKey, type: "Trailer", site: "YouTube" } : null;
  } catch (error) {
    console.error("Error al obtener el tráiler:", error);
    return null;
  }
}

// Búsqueda de películas
export async function fetchBusqueda(query) {
  try {
    // Punto de aprendizaje: encodeURIComponent para que los caracteres especiales (espacios, acentos) no rompan la URL.
    const res = await fetch(
      `${buildTmdbUrl("/search/movie", {
        language: TMDB_LANGUAGE,
        region: TMDB_REGION,
      })}&query=${encodeURIComponent(query)}`,
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    console.log(data) // Siempre nos va a dar 20 resultados como máximo
    return data; // { results: [], total_results: N, ... }
  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
}

// Traer películas favoritas

export async function fetchPeliculasFavoritas(favoritas) {
  const peliculasFavoritas = favoritas.map(async (id) => {
    const data = await fetchDetallesPelicula(id)
    return withOverviewFallback(data)
  })
  console.log(peliculasFavoritas)
}
