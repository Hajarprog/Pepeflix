import ContenedorPelisFavs from "@/components/ContenedorPelisFavs";

export default function Favoritas() {
  return (
    <div className="w-full min-h-screen">

      {/* Header de página */}
      <div className="w-full border-b border-[#2A2833]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-10 flex flex-col gap-2">
          <p className="text-xs font-mono tracking-[0.3em] uppercase text-[#7C5CFC]">
            Colección
          </p>
          <h1 className="text-5xl font-bold text-[#F5F5F5] tracking-tight">
            Mis favoritas
          </h1>
          <p className="text-[#5C5670] text-sm mt-1">
            Las películas que has guardado
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <ContenedorPelisFavs />
      </div>

    </div>
  );
}