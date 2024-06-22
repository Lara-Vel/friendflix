<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Http\Resources\FavouriteResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;

use Illuminate\Support\Facades\Redirect;

class FavouriteController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;


    public function index()
    {
        $user = Auth::user();
        $favourites = Favourite::where('user_id', $user->id)->latest()->get();

        return Inertia::render('MyFavorites/Index', [
            'favourites' => FavouriteResource::collection($favourites),
        ]);
    }



    public function toggle(Request $request)
    {
        $validated = $request->validate([
            'movie_id' => 'required|integer',
            'filmData' => 'required|array'
        ]);

        $user = $request->user();
        $movie_id = $validated['movie_id'];
        $data = $validated['filmData'];


        $favourite = Favourite::where('user_id', $user->id)->where('movie_id', $movie_id)->first();

        if ($favourite) {

            $favourite->delete();
            return back()->with('status', 'Favorito eliminado');
        } else {

            $favourite = Favourite::create([

                'user_id' => $user->id,
                'movie_id' => $movie_id,
                'title' => $data['title'],
                'overview' => $data['overview'],
                'poster_path' => $data['poster_path'],
                'backdrop_path' => $data['backdrop_path']

            ]);
            return back()->with('status', '¡Favorito guardado!');
        }
    }

    public function search()
    {



        $user = Auth::user();
        $favourites = Favourite::where("user_id", $user->id)->get();



        return Inertia::render('SearchMovies/Index', ["favourites" => FavouriteResource::collection($favourites)]);
    }


}
