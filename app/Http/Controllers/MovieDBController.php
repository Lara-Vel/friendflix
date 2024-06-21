<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class MovieDBController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
            'api_key' => env('TMDB_API_KEY'),
            'language' => 'es-US',
            'page' => $page,
        ]);

        $user = Auth::user();
        $favourites = Favourite::where('user_id', $user->id)->get();

        $films = $response->json();

        return Inertia::render('PopularMovies/Index', [
            'films' => $films,
            'favourites' => $favourites,
        ]);
    }


    public function myFavorites(Request $request)
    {
        $user = Auth::user();
        $favourites = Favourite::where('user_id', $user->id)->get();

        return Inertia::render('MyFavorites/Index', [
            'favourites' => $favourites,
        ]);
    }

    public function popularTvSeries(Request $request)
    {
        $page = $request->input('page', 1);
        $response = Http::get('https://api.themoviedb.org/3/tv/popular', [
            'api_key' => env('TMDB_API_KEY'),
            'language' => 'es-US',
            'page' => $page,
        ]);

        $user = Auth::user();
        $favourites = Favourite::where('user_id', $user->id)->get();

        $series = $response->json();

        return Inertia::render('PopularTvSeries/Index', [
            'series' => $series,
            'favourites' => $favourites,
        ]);
    }


}
