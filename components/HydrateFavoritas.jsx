"use client";

import { useEffect } from "react";
import { useFavoritas } from "@/store/useFavoritasStorage";

export default function HydrateFavoritas() {
  useEffect(() => {
    useFavoritas.persist.rehydrate();
  }, []);

  return null;
}
