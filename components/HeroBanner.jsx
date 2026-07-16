import Image from "next/image";
import { fetchPeliculasPopulares } from "@/lib/tmdbApi";
import Link from "next/link";

export default async function HeroBanner() {
  const { results } = await fetchPeliculasPopulares();
  const posters = results.slice(0, 18);

  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">

      {/* Mosaico de posters */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-1 scale-110 rotate-[-2deg] opacity-50">
        {posters.map((p) => (
          <div key={p.id} className="relative overflow-hidden">
            <Image
              src={p.poster_path
                ? `https://image.tmdb.org/t/p/w342${p.poster_path}`
                : "/poster-not-found.svg"}
              fill
              className="object-cover"
              alt={p.title}
              sizes="20vw"
            />
          </div>
        ))}
      </div>

      {/* Gradientes */}
      <div className="absolute inset-0 bg-[#0D0D12]/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D12] via-[#0D0D12]/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D12]/60 via-transparent to-[#0D0D12]/60" />

    {/* Contenido alineado a la izquierda como el navbar */}
<div className="absolute inset-0 flex flex-col justify-center pt-20">
  <div className="max-w-7xl w-full mx-auto px-6 md:px-10 flex flex-col items-start gap-5">
    <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#7C5CFC]">
      Tu cine personal
    </p>
    <h1 className="text-4xl md:text-6xl font-bold text-[#F5F5F5] leading-tight max-w-2xl text-left">
      Las mejores películas,{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFC] to-[#C084FC]">
        todas en un lugar
      </span>
    </h1>
    <p className="text-[#A09BB5] text-sm md:text-base max-w-sm leading-relaxed text-left">
      Descubre, guarda y explora miles de películas. <br/> Tu lista, tu ritmo.
    </p>
    <div className="flex items-center gap-3 mt-2">
      <Link
        href="/buscar"
        className="bg-[#7C5CFC] hover:bg-[#9B7FFF] text-white text-sm font-semibold px-8 py-3 rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
      >
        Explorar películas
      </Link>
      <Link
        href="/favoritas"
        className="bg-[#F5F5F5]/10 hover:bg-[#F5F5F5]/20 border border-[#2A2833] text-[#F5F5F5] text-sm font-medium px-8 py-3 rounded-xl transition-all duration-200 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
      >
        Mis favoritas
      </Link>
    </div>
  </div>
</div>
    </div>
  );
}