"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritas", label: "Favoritas" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#2A2833]/60 bg-[#0D0D12]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl w-full items-center justify-between px-6 md:px-10">

        <Link
          href="/"
          aria-label="PepeFlix - Inicio"
          className="flex items-center gap-2 font-mono text-lg tracking-[0.2em] text-[#9B7FFF] font-semibold shrink-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 48 48"
            className="h-9 w-9 shrink-0"
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

        {/* Links desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm tracking-wide transition-colors duration-200 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] ${
                  pathname === href
                    ? "text-[#F5F5F5] font-medium"
                    : "text-[#A09BB5] hover:text-[#F5F5F5]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Avatar desktop */}
        <div className="hidden md:flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#7C5CFC]/20 border border-[#7C5CFC]/30 flex items-center justify-center">
            <span className="text-[#9B7FFF] text-xs font-semibold">H</span>
          </div>
        </div>

        {/* Hamburguesa móvil */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC]"
        >
          <span
            className={`h-px w-6 bg-[#F5F5F5] transition-transform duration-300 ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-[#F5F5F5] transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-[#F5F5F5] transition-transform duration-300 ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t bg-[#0D0D12]/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden ${
          menuOpen
            ? "max-h-96 border-[#2A2833]/60"
            : "max-h-0 border-transparent"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`py-3 text-lg transition-colors duration-200 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] ${
                pathname === href
                  ? "text-[#F5F5F5] font-medium"
                  : "text-[#A09BB5]"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
