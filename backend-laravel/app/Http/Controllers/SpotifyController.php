<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class SpotifyController extends Controller
{
    public function getToken(): JsonResponse
    {
        // equivalente ao process.env
        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_CLIENT_SECRET');

        // chamada à API do Spotify
        $response = Http::asForm()
            ->withBasicAuth($clientId, $clientSecret)
            ->post('https://accounts.spotify.com/api/token', [
                'grant_type' => 'client_credentials',
            ]);

        // equivalente ao response.ok
        if ($response->successful()) {
            return response()->json([
                'access_token' => $response->json()['access_token'],
            ], 200);
        }

        // equivalente ao res.status(response.status)
        return response()->json([
            'error' => 'Erro ao obter token do Spotify',
            'details' => $response->json(),
        ], $response->status());
    }
}
