import { Link, router, Head } from "@inertiajs/react";
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
            <div className="movie-card-title">
                <h3 className="title">{film.title}</h3>
                <p>{film.vote}</p>
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
    }, [favourites]);

    const onAddFavorite = (film) => {
        router.post(
            route("favourites.toggle"),
            { movie_id: film.id, filmData: film },
            {
                onSuccess: (page) => {
                    const updatedFavorites = page.props.favourites;

                    setFavorites(updatedFavorites);
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Películas populares - Friendflix">
                <meta
                    name="description"
                    content="Explora las películas más populares y en tendencia en Friendflix."
                />
            </Head>
            <h2 className="home-container-text">
                <div className="home-container-firsttext font-semibold text-xl text-gray-800 leading-tight">
                    ¿No te decides?
                </div>
                <div className="home-container-firsttext font-semibold text-xl text-gray-800 leading-tight">
                    Descubre{" "}
                    <span className="home-container-secondtext font-semibold text-xl text-gray-800 leading-tight">
                        nuestras
                    </span>{" "}
                    <span className="home-container-firsttext font-semibold text-xl text-gray-800 leading-tight">
                        recomendaciones
                    </span>
                </div>
            </h2>
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
                            <a
                                aria-label="Button previous"
                                href={`/peliculas?page=${currentPage - 1}`}
                            >
                                &laquo; Anterior
                            </a>
                        ) : (
                            <Link
                                href={`/peliculas?page=${currentPage - 1}`}
                                className="button-pagination"
                            >
                                &laquo; Anterior
                            </Link>
                        )}
                    </>
                )}
                {currentPage < totalPages && (
                    <>
                        {!router.resolveComponent ? (
                            <a
                                aria-label="Button next"
                                href={`/peliculas?page=${currentPage + 1}`}
                            >
                                Siguiente &raquo;
                            </a>
                        ) : (
                            <Link
                                href={`/peliculas?page=${currentPage + 1}`}
                                className="button-pagination"
                            >
                                Siguiente &raquo;
                            </Link>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default PopularMovies;
