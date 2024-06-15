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

    // public function index()
    // {
    //     $favourites = Favourite::with('user')->latest()->get();

    //     return Inertia::render('MyFavorites/Index', [
    //         'favourites' => FavouriteResource::collection($favourites),
    //     ]);
    // }


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
        // Validar la entrada
        $validated = $request->validate([
            'movie_id' => 'required|integer',
            'filmData' => 'required|array'
        ]);

        $user = $request->user();
        $movie_id = $validated['movie_id'];
        $data = $validated['filmData'];

        // Buscar si el favorito ya existe
        $favourite = Favourite::where('user_id', $user->id)->where('movie_id', $movie_id)->first();

        if ($favourite) {
            // Eliminar el favorito existente
            $favourite->delete();
            return back()->with('status', 'Favorito eliminado');
        } else {
            // Crear un nuevo favorito
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


    // public function toggle(Request $request)
    // {
    //     $user = $request->user();
    //     $movie_id = $request->movie_id;
    //     $favourite = Favourite::where('user_id', $user->id)->where('movie_id', $movie_id)->first();

    //     if ($favourite) {
    //         $favourite->delete();
    //         return back()->with('status', 'Favorito eliminado');
    //     }

    //     $data = $request->filmData;
    //     info($data);
    //     info($user->id);
    //     info($movie_id);

    //     // Favourite::create([
    //     //     'user_id' => $user->id,
    //     //     'movie_id' => $movie_id,
    //     //     'original_title' => $data["original_title"],
    //     //     'overview' => $data["overview"],
    //     //     'poster_path' => $data["poster_path"],
    //     //     'backdrop_path' => $data["backdrop_path"]
    //     // ]);
    //     $favourite = new Favourite();
    //     $favourite->user_id = $user->id;
    //     $favourite->movie_id = $movie_id;
    //     $favourite->original_title = $data[''];
    //     $favourite->overview = $data['overview'];
    //     $favourite->poster_path = $data['poster_path'];
    //     $favourite->backdrop_path = $data['backdrop_path'];

    //     info($favourite);
    //     $favourite->save();

    //     return back()->with('status', '¡Favorito guardado!');

    // }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'movie_id' => ['required'],
            'title' => ['required'],
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
            'title' => ['nullable', 'string', 'max:250'],
            'overview' => ['nullable', 'string'],
            'poster_path' => ['nullable', 'string'],
            'backdrop_path' => ['nullable', 'string'],
        ]);

        $favourite->update($validated);

        return back()->with('status', 'Favorito actualizado');
    }

    public function destroy(Favourite $favourite)
    {
        \Log::info("Borrando el favorito con ID: {$favourite->id}");

        $this->authorize('delete', $favourite);

        $favourite->delete();

        return back()->with('status', 'Favorito borrado');

    }

    public function find(Request $request)
    {
        $query = $request->query('q');
        $favourites = Favourite::where('title', 'like', "%{$query}%")
            ->with('user')
            ->get();

        return Inertia::render('Favourites/SearchResults', [
            'favourites' => FavouriteResource::collection($favourites),
        ]);
    }

}
