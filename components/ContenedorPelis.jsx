import { fetchPeliculasPopulares } from "@/lib/tmdbApi";
import TarjetaPeli from "./TarjetaPeli";

export default async function ContenedorPelis() {
  const { results } = await fetchPeliculasPopulares();
  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {results.map((p) => (
        <TarjetaPeli key={p.id} peliData={p} />
      ))}
    </section>
  );
}