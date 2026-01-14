<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class SpotifyTokenController extends Controller
{
    public function token(): JsonResponse
    {
        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_CLIENT_SECRET');

        $response = Http::asForm()
            ->withHeaders([
                'Authorization' => 'Basic ' . base64_encode("$clientId:$clientSecret"),
            ])
            ->post('https://accounts.spotify.com/api/token', [
                'grant_type' => 'client_credentials',
            ]);

        if ($response->failed()) {
            return response()->json([
                'error' => 'Erro ao obter token do Spotify'
            ], 500);
        }

        return response()->json([
            'access_token' => $response->json()['access_token']
        ]);
    }
}
