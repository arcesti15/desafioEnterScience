export default async function geraToken() {
    const response = await fetch("http://localhost:3001/api/spotify-token");
    const data = await response.json();
    return data.access_token;
}

