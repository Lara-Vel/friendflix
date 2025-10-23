<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieDBController;
use App\Http\Controllers\FavouriteController;


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


Route::get('/buscar-peliculas', [App\Http\Controllers\FavouriteController::class, 'search'])->name('searchmovies.search')->middleware('auth');

Route::post('/profile/avatar', [ProfileController::class,
'updateAvatar'])->name('profile.avatar.update')->middleware('auth');
Route::post('/profile/avatar/delete', [ProfileController::class, 'deleteAvatar'])->name('profile.avatar.delete')->middleware('auth');

Route::fallback(function () {
    abort(404);
});

require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';
