"use client";
import { useFavoritas } from "@/store/useFavoritasStorage";
import TarjetaPeli from "./TarjetaPeli";
import { useEffect, useState } from "react";

export default function ContenedorPelisFavs() {
  const favoritas = useFavoritas((state) => state.favoritas);
  const [peliculasFavoritas, setPeliculasFavoritas] = useState([]);

  useEffect(() => {
    const cargarFavoritas = async () => {
      const res = await fetch("/api/peliculas", {
        method: "POST",
        body: JSON.stringify({ ids: favoritas }),
      });
      const data = await res.json();
      setPeliculasFavoritas(data);
    };
    if (favoritas.length) cargarFavoritas();
    else setPeliculasFavoritas([]);
  }, [favoritas]);

  if (favoritas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#2A2833">
          <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
        </svg>
        <p className="text-[#5C5670] text-sm">Todavía no tienes películas favoritas</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
      {peliculasFavoritas.map((p) => (
        <TarjetaPeli key={p.id} peliData={p} />
      ))}
    </section>
  );
}