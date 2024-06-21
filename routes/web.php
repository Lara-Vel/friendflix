<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieDBController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\FavouriteController;

Route::resource('movies', MovieController::class)->only('index', 'store', 'update', 'destroy')->middleware('auth');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/inicio', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/miperfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/miperfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/miperfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/peliculas', [MovieDBController::class, 'index'])->name('popularmovies/index')->middleware('auth');
Route::get('/favorites/index', [MovieDBController::class, 'myFavorites'])->name('favorites/index')->middleware('auth');


Route::get('/buscar-peliculas', [App\Http\Controllers\FavouriteController::class, 'search'])->name('searchmovies.search')->middleware('auth');

Route::get('/seriestv', [MovieDBController::class, 'index'])->name('populartvseries/index')->middleware('auth');


require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
