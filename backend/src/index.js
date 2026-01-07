import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.get('/api/spotify-token', async (req, res) => {
    const client_id = "3b82b211ca1d4892aaf36f80eb3f2446";
    const client_secret = "2dec0194d1134de2b9a03ea69dbf82e3";
    
    const credentials = `${client_id}:${client_secret}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
  
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      "Authorization": `Basic ${base64Credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    };
  
    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
  
      if (response.ok) {
        const data = await response.json();
        res.status(200).json({ access_token: data.access_token });
      } else {
        const errorData = await response.json();
        res.status(response.status).json({ error: errorData });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Iniciar o servidor na porta 3001 (ou outra que você preferir)
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });