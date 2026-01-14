"use client";
import { useEffect, useState } from "react";
import styles from "../styles/table.module.css";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import EventoService from "@/service/eventoService.js";

export default function TableContratacao() {
    const [contratacoes, setContratacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const service = new EventoService();

    // load events
    useEffect(() => {
        async function fetchEventos() {
            try {
                const dados = await service.getEvent();
                setContratacoes(dados);
            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchEventos();
    }, []);

    async function handleDelete(id) {
        const confirmacao = confirm("Tem certeza que deseja excluir esta contratação?");
        if (!confirmacao) return;

        try {
            await service.deleteEvent(id);

            // remove without a new fetch
            setContratacoes((prev) =>
                prev.filter((contrato) => contrato.id !== id)
            );
        } catch (error) {
            console.error("Erro ao excluir evento:", error);
            alert("Erro ao excluir contratação");
        }
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Contratações</h2>

            {loading ? (
                <p className={styles.feedback}>Carregando...</p>
            ) : contratacoes.length > 0 ? (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Contratante</th>
                                <th>Artista</th>
                                <th>Cachê</th>
                                <th>Data</th>
                                <th>Endereço</th>
                                <th>Imagem</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contratacoes.map((contrato) => (
                                <tr key={contrato.id}>
                                    <td>{contrato.event_name}</td>
                                    <td className={styles.artistName}>{contrato.artist}</td>
                                    <td className={styles.price}>R$ {contrato.price}</td>
                                    <td>{contrato.date}</td>
                                    <td className={styles.address}>{contrato.address}</td>
                                    <td>
                                        <Image
                                            width={50}
                                            height={50}
                                            src={contrato.image || "/default-image.jpg"}
                                            alt={contrato.artist}
                                            className={styles.artistImage}
                                        />
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <button
                                            onClick={() => handleDelete(contrato.id)}
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                            title="Excluir"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className={styles.feedback}>Nenhuma contratação registrada.</p>
            )}
        </div>
    );
}
