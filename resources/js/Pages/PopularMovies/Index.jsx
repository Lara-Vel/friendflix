import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ film, isFavorite, onAddFavorite, processing }) => {
    return (
        <div className="movie-container">
            <div className="movie-card">
                <img
                    src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                    alt={film.title}
                    className="poster-image"
                />
                <div className="overlay">
                    <img
                        src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
                        alt={`${film.title} backdrop`}
                        className="backdrop-image"
                    />
                    <div className="movie-details">
                        <p>{film.overview}</p>
                    </div>
                </div>
            </div>
            <h3 className="title">{film.title}</h3>
            <button
                className="favorite-button"
                onClick={() => onAddFavorite(film)}
                disabled={processing}
                style={{
                    color: isFavorite ? "red" : "gray",
                    zIndex: 1000,
                    fontSize: 24,
                }}
            >
                {processing ? (
                    "Guardando..."
                ) : isFavorite ? (
                    <FaHeart />
                ) : (
                    <CiHeart />
                )}
            </button>
        </div>
    );
};

const PopularMovies = ({ auth, films, favourites }) => {
    const filmsResults = films?.results || [];
    const totalPages = films ? films.total_pages : 1;
    const currentPage = films ? films.page : 1;

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(favourites);
        localStorage.setItem("favorites", JSON.stringify(favourites));
    }, [favourites]);

    const onAddFavorite = (film) => {
        router.post(
            route("favourites.toggle"),
            { movie_id: film.id, filmData: film },
            {
                onSuccess: (page) => {
                    const updatedFavorites = page.props.favourites;

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
            }
        );
    };

    const isFavorite = (movieId) => {
        return favorites.some((favorite) => favorite.movie_id === movieId);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Películas
                </h2>
            }
        >
            <div className="movies-grid">
                {filmsResults.map((film) => (
                    <MovieCard
                        key={film.id}
                        film={film}
                        isFavorite={isFavorite(film.id)}
                        onAddFavorite={onAddFavorite}
                    />
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <>
                        {!router.resolveComponent ? (
                            <a href={`/peliculas?page=${currentPage - 1}`}>
                                &laquo; Previous
                            </a>
                        ) : (
                            <Link href={`/peliculas?page=${currentPage - 1}`}>
                                &laquo; Previous
                            </Link>
                        )}
                    </>
                )}
                {currentPage < totalPages && (
                    <>
                        {!router.resolveComponent ? (
                            <a href={`/peliculas?page=${currentPage + 1}`}>
                                Next &raquo;
                            </a>
                        ) : (
                            <Link href={`/peliculas?page=${currentPage + 1}`}>
                                Next &raquo;
                            </Link>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default PopularMovies;
