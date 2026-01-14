let cachedToken = null;
let tokenExpiresAt = 0;

export default async function geraToken() {
  console.log("Verificando token em cache...");

  // if token is valid and has not expired, return it
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch("http://127.0.0.1:8000/api/spotify-token");

  if (!response.ok) {
    throw new Error("Erroooo ao obter token do Spotify");
  }

  const data = await response.json();

  console.log("Novo token obtido do Spotify.");
  cachedToken = data.access_token;

  // Token timeout
  tokenExpiresAt = Date.now() + 60 * 60 * 1000;

  return cachedToken;
}
