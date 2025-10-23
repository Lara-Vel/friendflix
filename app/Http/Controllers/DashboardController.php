<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Http\Resources\FavouriteResource;

class DashboardController
{
    public function index(Request $request)
    {

        $favouriteMovies = Favourite::with('user')->get();


        $groupedFavourites = $favouriteMovies->groupBy(function ($item) {
            return $item->user->name;
        });

        $result = [];
        foreach ($groupedFavourites as $userName => $movies) {
            $userMovies = [];
            $lastCreatedAt = $movies->max('created_at');
            $lastCreatedAtHuman = \Carbon\Carbon::parse($lastCreatedAt)->diffForHumans();
            foreach ($movies as $movie) {
                $posterPath = Str::startsWith($movie->poster_path, '/') ? $movie->poster_path : '/' . $movie->poster_path;

                $userMovies[] = [
                    'id' => $movie->movie_id,
                    'title' => $movie->title,
                    'image' => 'https://image.tmdb.org/t/p/w200' . $posterPath,
                    'overview' => $movie->overview,
                    'createdAt' => $movie->created_at->diffForHumans(),
                ];
            }
            $result[] = [
                'user' => [
                    'name' => $userName,
                    'avatar' => $movies[0]->user->avatar ?? 'avatars/default.webp',
                ],
                'movies' => $userMovies,
                'lastUpdatedAt' => $lastCreatedAtHuman,
            ];
        }


        return Inertia::render('Dashboard', [
            'groupedFavourites' => $result,
        ]);
    }

}
