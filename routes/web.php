<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MovieDBController;
use App\Http\Controllers\MovieController;

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

Route::get('/inicio', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/miperfil', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/miperfil', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/miperfil', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::get('/peliculas', [MovieDBController::class, 'index'])->name('popularmovies/index')->middleware('auth');

Route::get('/test', [MovieDBController::class, 'getMovie']);
require __DIR__ . '/auth.php';
