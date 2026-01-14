"use client"
import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import axios from 'axios';
import geraToken from '@/app/lib/services/apiToken';
import ModalSearch from './modal';

const SpotifySearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await geraToken();
            setAccessToken(token);
        };
        fetchToken();
    }, []);

    useEffect(() => {

        if (!accessToken || searchQuery.trim() === '') {
            setResults([]);
            setShowModal(false);
            return;
        }

        const fetchArtists = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://api.spotify.com/v1/search',
                    {
                        params: {
                            q: searchQuery,
                            type: 'artist',
                            limit: 10,
                        },
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                setResults(response.data.artists.items);
                setShowModal(true);
            } catch (error) {
                console.error('Erro ao buscar artistas:', error);
            } finally {
                setLoading(false);
            }
        };

        // Debounce to avoid excessive calls
        const delayDebounceFn = setTimeout(fetchArtists, 400);

        return () => clearTimeout(delayDebounceFn); // clear the timeout if the component is dismount or if the value change
    }, [searchQuery, accessToken]); // always redo when searchQuery change
    return (
        <div className='d-flex me-2 w-100'>
            {loading && (
                    <span style={{marginRight: '4px'}}><Loader color="white" size={40} /></span>
            )}
            <input
                type="text"
                placeholder="Buscar artistas"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ModalSearch showModal={showModal} setShowModal={setShowModal} results={results}>
            </ModalSearch>

        </div>
    );
};

export default SpotifySearch;