import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="text-4xl">🔍</p>
      <h1 className="text-2xl font-semibold text-[#F5F5F5]">Página no encontrada</h1>
      <p className="text-[#5C5670] text-sm max-w-sm">
        La página o película que buscas no existe o se ha movido.
      </p>
      <Link
        href="/"
        className="bg-[#7C5CFC] hover:bg-[#9B7FFF] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFC] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D12]"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
