import ContenedorPelis from "@/components/ContenedorPelis";
import HeroBanner from "@/components/HeroBanner";

export default async function Home() {
  return (
    <div className="w-full flex flex-col bg-[#0D0D12] min-h-screen">
      <HeroBanner />

      {/* Sección películas */}
      <div className="px-6 py-10 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-normal tracking-[0.2em] uppercase text-[#7C5CFC]">
            Más populares
          </h1>
         
        </div>
        <ContenedorPelis />
      </div>
    </div>
  );
}