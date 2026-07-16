import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritas = create(persist(
    (set) => ({
        favoritas: [], // es una propiedad y el [] vacio donde van a guardar los ids de las películas
        hasHydrated: false,
        añadirFavoritas: (idPeli) => set(state => ({
            favoritas: [...state.favoritas, idPeli]
        })),
        eliminarFavoritas: (idPeli) => set(state => ({
            favoritas: state.favoritas.filter(f => f !== idPeli)
        })),
        setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
        name: "favoritas-storage", // se aparece en localStorage ( opcional )
        skipHydration: true, // evita leer localStorage antes de que React hidrate el HTML del servidor
        partialize: (state) => ({ favoritas: state.favoritas }),
        onRehydrateStorage: () => (state) => {
            state?.setHasHydrated(true);
        },
    }
))
