import Image from "next/image";
import Link from "next/link";
import CajaComentarios from "./CajaComentarios";

export default function FichaPeliculaComponente({ peli, trailer }) {
  const backdropUrl = peli.backdrop_path
    ? `https://image.tmdb.org/t/p/original${peli.backdrop_path}`
    : null;

  const posterUrl = peli.poster_path
    ? `https://image.tmdb.org/t/p/w500${peli.poster_path}`
    : null;

  const rating = Math.round(peli.vote_average * 10) / 10;
  const stars = Math.round(peli.vote_average / 2);
  const runtime = peli.runtime
    ? `${Math.floor(peli.runtime / 60)}h ${peli.runtime % 60}min`
    : null;

  return (
    <div className="w-full min-h-screen bg-[#0D0D12]">

      {/* Hero con backdrop */}
      <div className="relative w-full h-[60vh] min-h-100 overflow-hidden">
        {backdropUrl ? (
          <Image
            src={backdropUrl}
            fill
            className="object-cover object-top"
            alt={`Backdrop de ${peli.title}`}
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#16151C]" />
        )}

        {/* Gradientes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12]/80 via-transparent to-transparent" />

        {/* Botón atrás */}
        <div className="absolute top-24 left-6">
          <Link
            href="/"
            className="flex items-center gap-2 bg-[#16151C]/80 hover:bg-[#2A2833] backdrop-blur-sm text-[#F5F5F5] text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 border border-[#2A2833] outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
          >
            ← Volver
          </Link>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative -mt-48 px-6 pb-12 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Poster */}
          <div className="shrink-0">
            <Image
              src={posterUrl ?? "/poster-not-found.svg"}
              width={240}
              height={360}
              className="rounded-2xl shadow-2xl border border-[#2A2833]"
              alt={`Poster de ${peli.title}`}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 pt-4 md:pt-32">
            <h1 className="text-3xl md:text-4xl font-medium text-[#F5F5F5] leading-tight">
              {peli.title}
            </h1>

            {peli.tagline && (
              <p className="text-[#7C5CFC] italic text-sm">
                &ldquo;{peli.tagline}&rdquo;
              </p>
            )}

            {/* Metadatos */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#A09BB5]">
              {peli.release_date && (
                <span>{new Date(peli.release_date).getFullYear()}</span>
              )}
              {runtime && (
                <>
                  <span className="text-[#2A2833]">·</span>
                  <span>{runtime}</span>
                </>
              )}
              {peli.vote_count > 0 && (
                <>
                  <span className="text-[#2A2833]">·</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[#C084FC]">
                      {"★".repeat(stars)}{"☆".repeat(5 - stars)}
                    </span>
                    <span className="text-[#F5F5F5] font-medium">{rating}</span>
                    <span className="text-[#5C5670]">/ 10</span>
                  </span>
                </>
              )}
            </div>

            {/* Géneros */}
            {peli.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {peli.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-[#7C5CFC]/10 border border-[#7C5CFC]/30 text-[#9B7FFF] text-xs font-medium rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Sinopsis */}
            {peli.overview && (
              <div className="mt-2">
                <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#5C5670] mb-2">
                  Sinopsis
                </h2>
                <p className="text-[#A09BB5] text-sm leading-relaxed max-w-xl">
                  {peli.overview}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trailer */}
        <div className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#5C5670] mb-4">
            Tráiler oficial
          </h2>
          {trailer?.key ? (
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl border border-[#2A2833]">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}?rel=0&modestbranding=1`}
                title={`Tráiler de ${peli.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 rounded-2xl bg-[#16151C] border border-[#2A2833]">
              <p className="text-[#5C5670] text-sm">No hay tráiler disponible</p>
            </div>
          )}
        </div>

        {/* Comentarios */}
        <div className="mt-12">
          <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#5C5670] mb-4">
            Tu opinión
          </h2>
          <CajaComentarios peliId={peli.id} />
        </div>
      </div>
    </div>
  );
}