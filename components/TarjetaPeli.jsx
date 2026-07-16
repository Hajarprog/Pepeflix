import Image from "next/image";
import Like from "@/components/Like";
import Link from "next/link";

export default function TarjetaPeli({ peliData }) {
  const rating = Math.round(peliData.vote_average * 10) / 10;
  const year = peliData.release_date?.slice(0, 4);

  return (
    <div className="relative group">
      <Link
        href={`/pelicula/${peliData.id}`}
        className="block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
      >
        <article className="relative overflow-hidden rounded-2xl bg-[#16151C] border border-[#2A2833] shadow-lg transition-all duration-300 ease-out group-hover:border-[#7C5CFC]/50 group-hover:shadow-[0_0_24px_rgba(124,92,252,0.15)] group-hover:-translate-y-1">

          {/* Poster */}
          <div className="relative aspect-2/3 w-full">
            <Image
              className="object-cover"
              loading="eager"
              src={
                peliData.poster_path
                  ? `https://image.tmdb.org/t/p/w500${peliData.poster_path}`
                  : "/poster-not-found.svg"
              }
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              alt={`Poster de ${peliData.title}`}
            />

            {/* Gradiente inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/20 to-transparent" />

            {/* Info inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h2 className="text-[#F5F5F5] font-semibold text-sm leading-tight line-clamp-2">
                {peliData.title}
              </h2>
              <div className="flex items-center justify-between mt-1.5">
                {year && (
                  <span className="text-[#5C5670] text-xs">{year}</span>
                )}
                {peliData.vote_average > 0 && (
                  <span className="flex items-center gap-1 text-xs">
                    <span className="text-[#C084FC]">★</span>
                    <span className="text-[#A09BB5] font-medium">{rating}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Overlay hover */}
            <div className="absolute inset-0 bg-[#0D0D12]/75 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4 gap-3">
              <span className="text-[#F5F5F5] text-xs font-semibold uppercase tracking-widest border border-[#7C5CFC]/60 bg-[#7C5CFC]/10 px-4 py-1.5 rounded-full">
                Ver ficha
              </span>
              {peliData.overview && (
                <p className="text-[#A09BB5] text-xs text-center line-clamp-4 leading-relaxed">
                  {peliData.overview}
                </p>
              )}
            </div>
          </div>
        </article>
      </Link>

      {/* Like */}
      <div className="absolute top-2 right-2 z-10">
        <Like idPeli={peliData.id} />
      </div>
    </div>
  );
}