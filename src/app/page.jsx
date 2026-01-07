"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Image from "next/image";
import style from "./page.module.css";
import { recomendados } from "./lib/services/apiServices.js";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [artistas, setArtista] = useState([]);
  const [carregadoArtista, setCarregadoArtista] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await recomendados();
      setArtista(res);
      setCarregadoArtista(true);
    }
    fetchData();
  }, []);
  if (carregadoArtista) {
    return (
      <div className={style.container}>
        {artistas.map((artista) => (
          <div key={artista.id} className={style.cardArtista}>
            <Image
              src={artista.images[0].url}
              width={320}
              height={320}
              alt="Imagem artista"
            />
            <div className={style.cardContent}>
              <h1>{artista.name}</h1>
              <hr />
              <h2>Gêneros: {artista.genres.length > 0 ? artista.genres.join(", ") : "Indisponível no momento"}</h2>
              <h2>Popularidade: {artista.popularity}%</h2>
              <h2>Seguidores: {artista.followers.total}</h2>
                <Link href={`/contratacao?name=${artista.name}&genre=${artista.genres[0]}&popularity=${artista.popularity}&image=${artista.images[0]?.url}`}>
              <button className={style.button}>
                  Contratar
              </button>
                </Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
  else {
    return (
      <>
        <h1 style={{ textAlign: "center" }}>CARREGANDO ARTISTAS...</h1>
      </>
    )
  }
}
