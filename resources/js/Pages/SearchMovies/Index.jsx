import { router, Head } from "@inertiajs/react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState, useEffect } from "react";
import Heart from "@/assets/icons/heart.svg?react";
import { CiSearch } from "react-icons/ci";
import SkeletonCard from "@/Components/SearchSkeletonCard";

export const SearchMovies = ({ favourites, auth }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [processing, setProcessing] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const isQueryEmpty = query.trim().length === 0;
    const showSkeleton = !isQueryEmpty && loading;

    useEffect(() => {
        if (favourites) {
            setFavorites(favourites);
        }
    }, [favourites]);

    const onAddFavorite = (film) => {
        setProcessing((prev) => ({ ...prev, [film.id]: true }));
        router.post(
            route("favourites.toggle"),
            { movie_id: film.id, filmData: film },
            {
                onSuccess: (page) => {
                    const updatedFavorites = page.props.favourites;
                    setFavorites(updatedFavorites);
                    setError(null);
                },
                onError: () => {
                    setError(
                        "Error al actualizar las películas. Inténtalo de nuevo."
                    );
                },
                onFinish: () =>
                    setProcessing((prev) => ({ ...prev, [film.id]: false })),
            }
        );
    };

    const onChange = (e) => {
        e.preventDefault();
        setQuery(e.target.value);

        setLoading(true);

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
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const isFavorite = (movieId) => {
        return favorites.some((favorite) => favorite.movie_id === movieId);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Buscar películas">
                <meta
                    name="description"
                    content="Encuentra las películas preferidas en nuestro buscador Friendflix. Descubre las películas por título."
                />
            </Head>
            <h2 className="container-text-search">
                {" "}
                <span className="container-text-search-firsttext">
                    Encuentra tu película
                </span>{" "}
                <span className="container-text-search-secondtext">
                    preferida
                </span>{" "}
            </h2>
            <div className="search-page">
                <div className="search-container">
                    <div className="search-add-content">
                        <div className="search-input-wrapper">
                            {!query && (
                                <CiSearch
                                    style={{
                                        color: "#9597A1",
                                        zIndex: 1000,
                                        fontSize: 24,
                                    }}
                                    className="search-icon"
                                />
                            )}
                            <input
                                type="text"
                                placeholder="Busca una película"
                                value={query}
                                onChange={onChange}
                                className={query ? "input-filled" : ""}
                            />
                        </div>

                            {isQueryEmpty && (
                                <div className="search-placeholder">
                                    <img
                                        src="/images/bird-banner-friendflix.webp"
                                        alt="Pajarito con gafas de cine y mensaje 'Aquí encuentras todas las pelis'"
                                    />
                                </div>
                            )}

                            {showSkeleton && (
                                <ul className="search-results" aria-busy="true">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <li key={`sk-${i}`}>
                                            <SkeletonCard />
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {!showSkeleton &&
                                !isQueryEmpty &&
                                results.length > 0 && (
                                    <ul className="search-results">
                                        {results.map((film) => (
                                            <li key={film.id}>
                                                <div className="search-result-card">
                                                    <div className="search-poster-wrapper">
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
                                                                    onAddFavorite(
                                                                        film
                                                                    )
                                                                }
                                                                disabled={
                                                                    processing[
                                                                        film.id
                                                                    ] || false
                                                                }
                                                                style={{
                                                                    fontSize: 20,
                                                                    color: isFavorite(
                                                                        film.id
                                                                    )
                                                                        ? "red"
                                                                        : "#9597A1",
                                                                }}
                                                            >
                                                                <Heart className="heart-icon" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p className="search-overview">
                                                        {film.overview}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                            {!showSkeleton &&
                                !isQueryEmpty &&
                                results.length === 0 && (
                                    <div className="search-no-results">
                                        <p>
                                            No se encontraron películas para “
                                            {query}”.
                                        </p>
                                        <img
                                            src="/images/Friendflix-sad.webp"
                                            alt="Icono de Friendflix triste"
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
};

export default SearchMovies;
