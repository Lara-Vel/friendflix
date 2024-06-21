<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FavouriteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            // 'id' => $this->resource->id,
            'movie_id' => $this->resource->movie_id,
            'title' => $this->resource->title,
            'overview' => $this->resource->overview,
            'poster_path' => $this->resource->poster_path,
            'backdrop_path' => $this->resource->backdrop_path,
            'vote' => $this->resource->vote_average,
            'createdAt' => $this->resource->created_at->diffForHumans(),
            'updatedAt' => $this->resource->updated_at->diffForHumans(),
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
