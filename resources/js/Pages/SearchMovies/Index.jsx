import { router } from "@inertiajs/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export const SearchMovies = ({ favourites }) => {
    console.log("Valor inicial de favourites:", favourites);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [processing, setProcessing] = useState(false);
    console.log("Estado inicial de favorites:", favorites);

    useEffect(() => {
        console.log("useEffect - favourites:", favourites);
        if (favourites) {
            setFavorites(favourites);
            localStorage.setItem("favorites", JSON.stringify(favourites));
        }
    }, [favourites]);

    const onAddFavorite = (film) => {
        console.log(
            "onAddFavorite - antes de actualizar, favorites:",
            favorites
        );
        setProcessing(true);
        router.post(
            route("favourites.toggle"),
            { movie_id: film.id, filmData: film },
            {
                onSuccess: (page) => {
                    const updatedFavorites = page.props.favourites;
                    console.log(
                        "onAddFavorite - después de actualizar, updatedFavorites:",
                        updatedFavorites
                    );
                    setFavorites(updatedFavorites);
                    localStorage.setItem(
                        "favorites",
                        JSON.stringify(updatedFavorites)
                    );
                    console.log("Favorite toggled successfully");
                },
                onError: (error) => {
                    console.error("Error toggling favorite:", error);
                },
                onFinish: () => setProcessing(false),
            }
        );
    };

    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);

        axios
            .get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: import.meta.env.VITE_REACT_APP_API_KEY,
                    language: "es-US",
                    page: 1,
                    include_adult: false,
                    query: e.target.value,
                },
            })
            .then((response) => {
                const data = response.data;
                if (!data.errors) {
                    setResults(data.results);
                } else {
                    setResults([]);
                }
            })
            .catch((error) => {
                console.error("Error al realizar la petición:", error);
                setResults([]);
            });
    };

    const isFavorite = (movieId) => {
        console.log("isFavorite - favorites:", favorites);
        return favorites.some((favorite) => favorite.movie_id === movieId);
    };

    return (
        <div className="add-page">
            <div className="container">
                <div className="add-content">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Busca una película"
                            value={query}
                            onChange={onChange}
                        />
                    </div>

                    {results.length > 0 && (
                        <ul className="results">
                            {results.map((film) => (
                                <li key={film.id}>
                                    <div className="result-card">
                                        <div className="poster-wrapper">
                                            {film.poster_path ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                                                    alt={`${film.title} Poster`}
                                                />
                                            ) : (
                                                <div className="filler-poster" />
                                            )}
                                        </div>

                                        <div className="info">
                                            <div className="header">
                                                <h3 className="title">
                                                    {film.title}
                                                </h3>
                                            </div>

                                            <div className="controls">
                                                <button
                                                    className="btn"
                                                    onClick={() =>
                                                        onAddFavorite(film)
                                                    }
                                                    disabled={processing}
                                                    style={{
                                                        color: isFavorite(
                                                            film.id
                                                        )
                                                            ? "red"
                                                            : "gray",
                                                    }}
                                                >
                                                    {processing ? (
                                                        "Guardando..."
                                                    ) : isFavorite(film.id) ? (
                                                        <FaHeart />
                                                    ) : (
                                                        <FaHeart
                                                            style={{
                                                                color: "gray",
                                                            }}
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchMovies;
