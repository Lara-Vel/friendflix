<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieDBController;
use App\Http\Controllers\FavouriteController;


Route::post('/favouritesToggle', [App\Http\Controllers\FavouriteController::class, 'toggle'])
    ->name('favourites.toggle');

Route::get('/mis-favoritos', [App\Http\Controllers\FavouriteController::class, 'index'])
    ->name('favourites.index');


require __DIR__ . '/auth.php';
