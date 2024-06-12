<?php

namespace App\Http\Controllers;

use App\Models\Favourite;
use App\Http\Resources\FavouriteResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavouriteController extends Controller
{

    public function index()
    {
        $favourites = Favourite::with('user')->latest()->get();

        return Inertia::render('MyFavorites/Index', [
            'favourites' => FavouriteResource::collection($favourites),
        ]);
    }
    public function toggle(Request $request)
    {
        $user = $request->user();
        $movie_id = $request->movie_id;
        $favourite = Favourite::where('user_id', $user->id)->where('movie_id', $movie_id)->first();

        if ($favourite) {
            $favourite->delete();
            return back()->with('status', 'Favorito eliminado');
        }

        $data = $request->filmData;

        Favourite::create([
            'user_id' => $user->id,
            'movie_id' => $movie_id,
            'original_title' => $data["original_title"],
            'overview' => $data["overview"],
            'poster_path' => $data["poster_path"],
            'backdrop_path' => $data["backdrop_path"]
        ]);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'movie_id' => ['required'],
            'original_title' => ['required'],
            'overview' => ['nullable|string'],
            'poster_path' => ['nullable|string'],
            'backdrop_path' => ['nullable|string'],
        ]);

        $favourite = $request->user()->favourites()->create($validated);

        return back()->with('status', '¡Favorito guardado!');
    }

    public function show(Favourite $favourite)
    {
        return Inertia::render('Favourites/Show', [
            'favourite' => new FavouriteResource($favourite->load('user')),
        ]);
    }

    public function update(Request $request, Favourite $favourite)
    {
        $validated = $request->validate([
            'original_title' => ['nullable', 'string', 'max:250'],
            'overview' => ['nullable', 'string'],
            'poster_path' => ['nullable', 'string'],
            'backdrop_path' => ['nullable', 'string'],
        ]);

        $favourite->update($validated);

        return back()->with('status', 'Favorito actualizado');
    }

    public function destroy(Favourite $favourite)
    {
        $favourite->delete();

        return back()->with('status', 'Favorito borrado');

    }

    public function find(Request $request)
    {
        $query = $request->query('q');
        $favourites = Favourite::where('original_title', 'like', "%{$query}%")
            ->with('user')
            ->get();

        return Inertia::render('Favourites/SearchResults', [
            'favourites' => FavouriteResource::collection($favourites),
        ]);
    }

}
