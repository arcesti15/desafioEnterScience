"use client"
import styles from '../styles/card.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import EventoService from '@/service/eventoService.js';

export default function CardArtista(props) {
    const artista = props.artista;
    const [showModal, setShowModal] = useState(false);
    const [contrato, setContrato] = useState({
        event_name: '',
        artist: artista.name,
        price: '',
        date: '',
        address: '',
        image: artista.image
    });

    const eventoService = new EventoService();
    const router = useRouter();

    function manipulaContrato(ev) {
        const { name, value } = ev.target;
        setContrato((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault();

        if (!contrato.event_name || contrato.price <= 0 || !contrato.date || !contrato.address) {
            alert("Preencha todos os campos de contratação!");
            return;
        }

        // payload sent to backend API
        const payload = {
            event_name: contrato.event_name,
            artist: contrato.artist,
            price: Number(contrato.price),
            date: contrato.date,
            address: contrato.address,
            image: contrato.image
        };

        try {
            await eventoService.createEvent(payload);
            setShowModal(true);
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar evento");
        }
    }

    function closeModal() {
        setShowModal(false);
        router.push("/");
    }

    return (
        <>
            {showModal ? (
                <FeedbackModal tex show={showModal} onClose={() => closeModal()} />
            ) : (
                <div className={styles.container}>
                    <div className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <Image
                                width={500}
                                height={500}
                                src={artista?.image || '/default-image.jpg'}
                                alt={artista?.name || 'Imagem do Artista'}
                                className={styles.artistImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h2 className={styles.artistName}>{artista?.name}</h2>
                            <div className={styles.infoRow}>
                                <span className={styles.badge}>
                                    <strong>Gênero:</strong> {artista?.genre}
                                </span>
                                <span className={styles.badge}>
                                    <strong>Popularidade:</strong> {artista?.popularity}%
                                </span>
                            </div>
                            <p className={styles.description}>{artista?.description}</p>
                        </div>
                    </div>

                    <div className={styles.formContainer}>
                        <h3 className={styles.formTitle}>Informações do Evento</h3>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="event_name">Nome do Evento</label>
                                <input
                                    type="text"
                                    placeholder="Digite o nome do evento"
                                    name="event_name"
                                    id="event_name"
                                    value={contrato.event_name}
                                    onChange={manipulaContrato}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label>Artista Selecionado</label>
                                <input
                                    type="text"
                                    value={artista?.name}
                                    disabled
                                    className={`${styles.input} ${styles.inputDisabled}`}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="price">Cachê (R$)</label>
                                <input
                                    type="number"
                                    placeholder="Digite o valor do cachê"
                                    name="price"
                                    id="price"
                                    value={contrato.price}
                                    onChange={manipulaContrato}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="date">Data do Evento</label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={contrato.date}
                                    onChange={manipulaContrato}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="address">Endereço</label>
                                <input
                                    type="text"
                                    placeholder="Digite o endereço do evento"
                                    name="address"
                                    id="address"
                                    value={contrato.address}
                                    onChange={manipulaContrato}
                                    className={styles.input}
                                />
                            </div>

                            <button type="submit" className={styles.submitButton}>
                                Confirmar Contratação
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}