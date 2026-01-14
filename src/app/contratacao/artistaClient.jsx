"use client";

import { useSearchParams } from "next/navigation";
import CardArtista from "./components/cardArtista";

export default function ArtistaClient() {
  const searchParams = useSearchParams();

  const artista = {
    name: searchParams.get("name"),
    genre: searchParams.get("genre"),
    popularity: searchParams.get("popularity"),
    image: searchParams.get("image"),
  };

  return <CardArtista artista={artista} />;
}
