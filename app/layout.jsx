import { Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HydrateFavoritas from "@/components/HydrateFavoritas";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata = {
  title: "PepeFlix | Películas populares",
  description: "Streaming de películas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sora.variable} h-full`}>
      <body className="min-h-full bg-[#0D0D12] text-[#F5F5F5] font-[family-name:var(--font-sora)]">
        <HydrateFavoritas />

        <header className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </header>

        <main className="min-h-screen">
          {children}
        </main>
       <Footer />
      </body>
    </html>
  );
}