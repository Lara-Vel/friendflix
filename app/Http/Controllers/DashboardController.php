<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DashboardController
{
    public function index(Request $request)
    {
        // Obtener todos los favoritos con la relación del usuario cargada
        $favouriteMovies = Favourite::with('user')->get();

        // Agrupar los favoritos por usuario
        $groupedFavourites = $favouriteMovies->groupBy(function ($item) {
            return $item->user->name;
        });

        $result = [];
        foreach ($groupedFavourites as $userName => $movies) {
            $userMovies = [];
            foreach ($movies as $movie) {
                $posterPath = Str::startsWith($movie->poster_path, '/') ? $movie->poster_path : '/' . $movie->poster_path;
                $userMovies[] = [
                    'id' => $movie->movie_id,
                    'title' => $movie->title,
                    'image' => 'https://image.tmdb.org/t/p/w200' . $posterPath,
                ];
            }
            $result[] = [
                'user' => $userName,
                'movies' => $userMovies,
            ];
        }


        return Inertia::render('Dashboard', [
            'groupedFavourites' => $result,
        ]);
    }

}
