"use client";
import { useEffect, useState } from "react";
import styles from "../styles/table.module.css";
import Image from "next/image";

export default function TableContratacao() {
    const [contratacoes, setContratacoes] = useState([]);

    useEffect(() => {
        // Recupera os dados do localStorage
        const dadosSalvos = JSON.parse(localStorage.getItem("contratos")) || [];
        setContratacoes(dadosSalvos); // Agora armazenamos um array corretamente
    }, []);

    return (
        <div className={styles.container}>
            <h2>Lista de Contratações</h2>

            {contratacoes.length > 0 ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome do contratante</th>
                            <th>Artista</th>
                            <th>Cache</th>
                            <th>Data</th>
                            <th>Endereço</th>
                            <th>Imagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contratacoes.map((contrato, index) => (
                            <tr key={index}>
                                <td>{contrato.name}</td>
                                <td>{contrato.artist}</td>
                                <td>R$ {contrato.cache}</td>
                                <td>{contrato.data}</td>
                                <td>{contrato.endereco}</td>
                                <td>
                                    <Image
                                        width={80}
                                        height={80}
                                        src={contrato.image}
                                        alt={contrato.artist}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className={styles.feedback}>Nenhuma contratação registrada.</p>
            )}
        </div>
    );
}
