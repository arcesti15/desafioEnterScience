"use client"
import { useSearchParams } from "next/navigation";
import CardArtista from "./components/cardArtista";

export default function Artista() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const genre = searchParams.get("genre");
    const popularity = searchParams.get("popularity");
    const image = searchParams.get("image");
    const artista = { name, genre, popularity, image};
    return (
        <>
            <CardArtista artista={artista}>

            </CardArtista>
        </>
    );
}