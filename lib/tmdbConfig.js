export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_LANGUAGE = "es-ES";
export const TMDB_FALLBACK_LANGUAGE = "en-US";
export const TMDB_REGION = "ES";
export const DEFAULT_OVERVIEW = "Sinopsis no disponible";

export function buildTmdbUrl(path, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  url.searchParams.set("api_key", process.env.API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}
