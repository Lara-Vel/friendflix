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
        try {

            $page = $request->input('page', 1);
            $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
                'api_key' => env('TMDB_API_KEY'),
                'language' => 'es-US',
                'page' => $page,
            ]);

            if ($response->successful()) {
                $films = $response->json();
            } else {

                throw new \Exception('Error al obtener las películas desde TMDb API');
            }

            $user = Auth::user();
            $favourites = Favourite::where('user_id', $user->id)->get();


            return Inertia::render('PopularMovies/Index', [
                'films' => $films,
                'favourites' => $favourites,
            ]);
        } catch (\Exception $e) {

            return back()->withErrors(['message' => $e->getMessage()]);
        }
    }




    public function myFavorites(Request $request)
    {
        $user = Auth::user();
        $favourites = Favourite::where('user_id', $user->id)->get();

        return Inertia::render('MyFavorites/Index', [
            'favourites' => $favourites,
        ]);
    }


}




// public function index(Request $request)
// {
//     $page = $request->input('page', 1);
//     $response = Http::get('https://api.themoviedb.org/3/movie/popular', [
//         'api_key' => env('TMDB_API_KEY'),
//         'language' => 'es-US',
//         'page' => $page,
//     ]);

//     $user = Auth::user();
//     $favourites = Favourite::where('user_id', $user->id)->get();

//     $films = $response->json();

//     return Inertia::render('PopularMovies/Index', [
//         'films' => $films,
//         'favourites' => $favourites,
//     ]);
// }
