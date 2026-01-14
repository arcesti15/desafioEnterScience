<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SpotifyTokenController;
use App\Http\Controllers\EventController;

Route::get('/spotify-token', [SpotifyTokenController::class, 'token']);

Route::get('/events', [EventController::class, 'get']);
Route::post('/events', [EventController::class, 'save']);
Route::delete('/events/{id}', [EventController::class, 'delete']);
