"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import geraToken from '@/app/lib/services/apiToken';
import ModalSearch from './modal';

const SpotifySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    let accessToken;
    async function fetchToken() {
        accessToken = await geraToken();
    }
    fetchToken();

    useEffect(() => {
        const fetchArtists = async () => {
            if (searchQuery.trim() === '') {
                setResults([]);
                return;
            }

            setLoading(true);

            try {
                const response = await axios.get(`https://api.spotify.com/v1/search`, {
                    params: {
                        q: searchQuery,
                        type: 'artist',
                    },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setResults(response.data.artists.items);
                setShowModal(true);
            } catch (error) {
                console.error('Erro ao buscar artistas:', error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce para evitar chamadas a cada tecla pressionada
        const delayDebounceFn = setTimeout(() => {
            fetchArtists();
        }, 500);

        return () => clearTimeout(delayDebounceFn); // Limpar o timeout se o componente for desmontado ou o valor mudar
    }, [searchQuery, accessToken]); // Reexecuta sempre que searchQuery mudar
    return (
        <div className='d-flex me-2 w-100'>
            <input
                type="text"
                placeholder="Buscar artistas"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setShowResults(true)
                }
                }
            />
            {loading && <p>Carregando...</p>}
            {
                showResults ? (
                    <ModalSearch showModal={showModal} setShowModal={setShowModal} results={results}>
                        
                    </ModalSearch>
                )
                    :
                    <></>
            }
        </div>
    );
};

export default SpotifySearch;
