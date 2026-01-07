import axios from "axios";
import geraToken from "./apiToken";


export async function recomendados() {
    const urlBase = "https://api.spotify.com/v1/artists?ids=5nP8x4uEFjAAmDzwOEc9b8,5e4Dhzv426EvQe3aDb64jL,0blbVefuxOGltDBa00dspv,0du5cEVh5yTK9QJze8zA0C,3w2HqkKa6upwuXEULtGvnY,4dpARuHxo51G3z768sgnrY"
    try {
        let token = await geraToken();
        const response = await axios.get(urlBase, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "Application/json"
            },
        })
        const data = response.data;
        return data.artists;
    }
    catch(error) {
        console.error(`Erro ao buscar recomendações: ${error}`);
    }
}

export async function fetchAlbums(id) {
    let url = "https://api.spotify.com/v1/artists/id/albums?limit=5";
    try {
        let token = await geraToken();
        url = url.replace("id", id);
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "Application/json"
            }
        })
        const data = response.data;
        return data;
    }
    catch(error) {
        console.log(error.message);
    }
}