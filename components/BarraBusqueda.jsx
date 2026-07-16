"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function BarraBusqueda({ placeholder = "Nombre de la película...", paramKey = "q" }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [texto, setTexto] = useState("");

  useEffect(() => {
    setTexto(searchParams.get(paramKey) ?? "");
  }, [paramKey, searchParams]);

  function buscar() {
    if (!texto.trim()) return;
    const params = new URLSearchParams(searchParams);
    params.set(paramKey, texto.trim());
    // limpiar el otro parámetro
    if (paramKey === "id") params.delete("q");
    else params.delete("id");
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="flex w-full rounded-xl overflow-hidden border border-[#2A2833] focus-within:border-[#7C5CFC]/60 transition-colors duration-200 focus-within:shadow-[0_0_16px_rgba(124,92,252,0.1)]">
        <input
          placeholder={placeholder}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscar()}
          type="text"
          className="flex-1 bg-[#16151C] text-[#F5F5F5] placeholder:text-[#5C5670] px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={buscar}
          aria-label="Buscar"
          className="bg-[#7C5CFC] hover:bg-[#9B7FFF] active:bg-[#6B4EE0] px-5 flex items-center justify-center transition-colors duration-200 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5] focus-visible:ring-inset"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="white">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}