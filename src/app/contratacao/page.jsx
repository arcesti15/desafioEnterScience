import { Suspense } from "react";
import ArtistaClient from "./artistaClient";

export default function ContratacaoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ArtistaClient />
    </Suspense>
  );
}
