<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieDBController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\FavouriteController;

// Route::get('/peliculas-series', function () {
//     return Inertia::render('Movies/Index');
// })->middleware('auth')->name('movies.index');

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

Route::delete('/favourites/{favourite}', [FavouriteController::class, 'destroy'])
    ->name('favourites.destroy')->middleware('auth');

// Route::get('/favoritos', function () {
//     return Inertia::render('Favourites/Index');
// })->name('favourites.index');


require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';

// Route::get("/favourites/{user}", [FavouriteController::class, 'getFavourites'])->name('favourites.index');
// Route::get("/addFavourite/{user}/{movie}", [FavouriteController::class, 'addFavourite'])->name('favourites.add');
// Route::get("/delFavourite/{user}/{movie}", [FavouriteController::class, 'delFavourite'])->name('favourites.del');
