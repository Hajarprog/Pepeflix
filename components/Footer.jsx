import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#2A2833] bg-[#0D0D12] px-6 md:px-10 py-10 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        <div className="flex flex-col gap-2">
          <Link
            href="/"
            aria-label="PepeFlix - Inicio"
            className="flex w-fit items-center gap-2 rounded-md font-mono text-sm font-semibold tracking-[0.18em] text-[#9B7FFF] outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 48 48"
              className="h-6 w-6 shrink-0"
              fill="none"
            >
              <path
                d="M12.5 18.5c-2.5-.6-4.5-2.7-4.5-5.4 0-3.1 2.5-5.6 5.6-5.6 1.1 0 2.2.3 3 .9a6.4 6.4 0 0 1 12.3 0 5.5 5.5 0 0 1 8.7 4.5c0 2.8-2 5.1-4.6 5.6"
                fill="#9B7FFF"
              />
              <path
                d="M14.5 18h19l-3 23h-13l-3-23Z"
                fill="#7C5CFC"
              />
              <path
                d="M18.5 21.5 20 38M24 21.5V38M29.5 21.5 28 38"
                stroke="#D8CEFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M14.5 18h19l-.7 5H15.2l-.7-5Z"
                fill="#D8CEFF"
              />
              <path
                d="M18 14.8c.9-1.3 2.1-2 3.6-2M27.5 14.5c.8-.9 1.8-1.3 3-1.3"
                stroke="#D8CEFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="hidden md:inline">PEPEFLIX</span>
          </Link>
          <p className="text-[#5C5670] text-xs max-w-xs leading-relaxed">
            Aplicación para descubrir películas.
            <br/>Datos proporcionados por{" "}
            <Link
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7C5CFC] hover:text-[#9B7FFF] transition-colors rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
            >
              TMDB
            </Link>
            .
          </p>
        </div>


        {/* Derecha — autora */}
        <div className="flex flex-col items-start md:items-end gap-1">
          <p className="text-[#A09BB5] text-xs font-medium">Proyecto desarrollado por Hajar</p>
          <p className="text-[#5C5670] text-xs">© 2026</p>
        </div>

      </div>
    </footer>
  );
}
