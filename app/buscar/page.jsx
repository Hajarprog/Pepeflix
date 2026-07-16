import BarraBusqueda from "@/components/BarraBusqueda";
import TarjetaPeli from "@/components/TarjetaPeli";
import { fetchBusqueda, fetchPelicula } from "@/lib/tmdbApi";
import Link from "next/link";

export const metadata = {
  title: "PepeFlix | Buscar",
  description: "Busca tus películas favoritas",
};

export default async function Buscar({ searchParams }) {
  const { q, id, modo } = await searchParams;
  const esModoId = modo === "id" || !!id;

  const dataQuery = q && !esModoId ? await fetchBusqueda(q) : null;
  const dataPorId = id && esModoId ? await fetchPelicula(id) : null;

  return (
    <div className="w-full min-h-screen">

      {/* Header de página */}
      <div className="w-full border-b border-[#2A2833]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-10 flex flex-col gap-8">

          <div className="flex flex-col gap-2">
            <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#7C5CFC]">
              Búsqueda
            </p>
            <h1 className="text-5xl font-bold text-[#F5F5F5] tracking-tight">
              Buscar
            </h1>
          </div>

          {/* Toggle modo */}
          <div className="flex gap-2">
            <Link
              href="/buscar"
              className={`text-xs px-5 py-2 rounded-full border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12] ${
                !esModoId
                  ? "bg-[#7C5CFC] border-[#7C5CFC] text-white"
                  : "border-[#2A2833] text-[#5C5670] hover:text-[#A09BB5] hover:border-[#A09BB5]"
              }`}
            >
              Por nombre
            </Link>
            <Link
              href="/buscar?modo=id"
              className={`text-xs px-5 py-2 rounded-full border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12] ${
                esModoId
                  ? "bg-[#7C5CFC] border-[#7C5CFC] text-white"
                  : "border-[#2A2833] text-[#5C5670] hover:text-[#A09BB5] hover:border-[#A09BB5]"
              }`}
            >
              Por ID
            </Link>
          </div>

          {/* Barra de búsqueda */}
          <BarraBusqueda
            placeholder={esModoId ? "Introduce un ID de película..." : "Nombre de la película..."}
            paramKey={esModoId ? "id" : "q"}
          />
        </div>
      </div>

      {/* Resultados */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* Resultados por nombre */}
        {dataQuery?.results?.length > 0 && (
          <section className="flex flex-col gap-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#5C5670]">
              {dataQuery.results.length} resultados para{" "}
              <span className="text-[#9B7FFF]">"{q}"</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {dataQuery.results.map((p) => (
                <TarjetaPeli key={p.id} peliData={p} />
              ))}
            </div>
          </section>
        )}

        {/* Sin resultados */}
        {dataQuery?.results?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-4xl">🎬</p>
            <p className="text-[#F5F5F5] font-medium">Sin resultados</p>
            <p className="text-[#5C5670] text-sm">
              No encontramos nada para{" "}
              <span className="text-[#9B7FFF]">"{q}"</span>
            </p>
          </div>
        )}

        {/* Resultado por ID */}
        {dataPorId?.id && (
          <section className="flex flex-col gap-6">
            <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#5C5670]">
              Resultado para ID <span className="text-[#9B7FFF]">{id}</span>
            </p>
            <div className="w-48">
              <TarjetaPeli peliData={dataPorId} />
            </div>
          </section>
        )}

        {/* ID no encontrado */}
        {id && !dataPorId?.id && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-4xl">🔍</p>
            <p className="text-[#F5F5F5] font-medium">ID no encontrado</p>
            <p className="text-[#5C5670] text-sm">
              No existe ninguna película con el ID{" "}
              <span className="text-[#9B7FFF]">"{id}"</span>
            </p>
          </div>
        )}

        {/* Estado vacío */}
        {!q && !id && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#7C5CFC">
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </div>
            <p className="text-[#F5F5F5] font-medium">
              {esModoId ? "Busca por ID" : "¿Qué quieres ver hoy?"}
            </p>
            <p className="text-[#5C5670] text-sm text-center max-w-xs">
              {esModoId
                ? "Introduce el ID exacto de TMDB para encontrar una película"
                : "Escribe el nombre de cualquier película para empezar"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}