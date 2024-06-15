<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\User;
use Illuminate\Http\Request;
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
                $userMovies[] = [
                    'id' => $movie->movie_id,
                    'title' => $movie->title,
                    'description' => $movie->overview,
                ];
            }
            $result[] = [
                'user' => $userName,
                'movies' => $userMovies,
            ];
        }

        // Renderizar la vista con Inertia
        return Inertia::render('Dashboard', [
            'groupedFavourites' => $result,
        ]);
    }

}
