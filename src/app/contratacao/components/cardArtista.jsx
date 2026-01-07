"use client"
import styles from '../styles/card.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

export default function CardArtista(props) {
    const artista = props.artista;
    const [showModal, setShowModal] = useState(false);
    const [contrato, setContrato] = useState({
        name: '',
        artist: artista.name,
        cache: '',
        data: '',
        endereco: '',
        image: artista.image
    });

    const router = useRouter();

    function manipulaContrato(ev) {
        const { name, value } = ev.target;
        setContrato((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    function handleSubmit(ev) {
        ev.preventDefault();
        if (contrato.name && contrato.cache > 0 && contrato.data && contrato.endereco) {
            setShowModal(true);
            const contratosSalvos = JSON.parse(localStorage.getItem("contratos")) || [];
            contratosSalvos.push(contrato);
            localStorage.setItem("contratos", JSON.stringify(contratosSalvos));

        }
        else {
            alert("Preencha todos os campos de contratação!");
        }
    }

    function closeModal() {
        setShowModal(false);
        router.push("/");
    }

    return (
        <>

            {
                showModal ?
                    <FeedbackModal show={showModal} onClose={() => closeModal()} />

                    :

                    <div className={styles.container}>
                        <div className={styles.card}>
                            <Image
                                width={500}
                                height={500}
                                src={artista?.image || '/default-image.jpg'} // Imagem padrão se não houver
                                alt={artista?.name || 'Imagem do Artista'}
                            />
                            <div>
                                <p>{artista?.name}</p>
                                <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
                                    <span>Principal genero: {artista?.genre}</span>
                                    <span>Popularidade: {artista?.popularity}%</span>
                                </div>
                                <p className={styles.description}>{artista?.description}</p>
                            </div>
                        </div>
                        {/* Formulário */}
                        <div className={styles.formContainer}>
                            <h3>Informações do Evento</h3>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder="Nome"
                                    name='name'
                                    id='name'
                                    value={contrato.name}
                                    onChange={manipulaContrato} />
                                <input type="text" placeholder="Artista Selecionado" value={artista?.name} disabled />
                                <input type="text" placeholder="Cache"
                                    name='cache'
                                    id='cache'
                                    value={contrato.cache}
                                    onChange={manipulaContrato} />
                                <input type="date" placeholder="Data do Evento"
                                    name='data'
                                    id='data'
                                    value={contrato.data}
                                    onChange={manipulaContrato} />

                                <input type="text" placeholder="Endereço"
                                    name='endereco'
                                    id='endereco'
                                    value={contrato.endereco}
                                    onChange={manipulaContrato} />
                                <button type="submit">Enviar</button>
                            </form>
                        </div>
                    </div>
            }
        </>
    );
}
