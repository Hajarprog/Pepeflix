"use client";
import { useFavoritas } from "@/store/useFavoritasStorage";

export default function Like({ idPeli }) {
  const favoritas = useFavoritas((state) => state.favoritas);
  const hasHydrated = useFavoritas((state) => state.hasHydrated);
  const añadirFavoritas = useFavoritas((state) => state.añadirFavoritas);
  const eliminarFavoritas = useFavoritas((state) => state.eliminarFavoritas);

  // Antes de rehidratar desde localStorage, se asume "no favorita" para que coincida con el HTML del servidor
  const esFavorita = hasHydrated && favoritas.includes(idPeli);

  const togglePeliFavorita = () => {
    if (esFavorita) eliminarFavoritas(idPeli);
    else añadirFavoritas(idPeli);
  };

  return (
    <button
      onClick={togglePeliFavorita}
      aria-label={esFavorita ? "Quitar de favoritas" : "Añadir a favoritas"}
      className="rounded-full outline-none transition-transform duration-200 hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
    >
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
        <path
          d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
          className={`transition-all duration-200 ${
            esFavorita
              ? "fill-red-500 stroke-red-600"
              : "fill-transparent stroke-white"
          }`}
          strokeWidth="40"
        />
      </svg>
    </button>
  );
}