import { notFound } from "next/navigation";
import FichaPeliculaComponente from "@/components/FichaPeliculaComponente";
import { fetchPelicula, fetchPeliTrailer } from "@/lib/tmdbApi";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const peli = await fetchPelicula(id);

  if (!peli?.id) {
    return { title: "PepeFlix | Película no encontrada" };
  }

  return {
    title: `PepeFlix | ${peli.title}`,
    description: peli.overview,
  };
}

export default async function FichaPelicula({ params }) {
  const { id } = await params;

  const peli = await fetchPelicula(id);

  if (!peli?.id) {
    notFound();
  }

  const trailer = await fetchPeliTrailer(id);

  return <FichaPeliculaComponente peli={peli} trailer={trailer} />;
}
