import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaHeart } from "react-icons/fa";
import { router } from "@inertiajs/react";

const MovieCard = ({ film }) => {
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
        </div>
    );
};

const MyFavorites = ({ auth, favourites, processing }) => {
    const [favorites, setFavorites] = useState(favourites || []);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setFavorites(favourites || []);
    }, [favourites]);

    const onRemoveFavorite = (film) => {
        router.post(
            route("favourites.toggle"),
            { movie_id: film.movie_id, filmData: film },
            {
                onSuccess: (page) => {
                    if (page.props.favorites) {
                        setFavorites(page.props.favorites);
                    } else {
                        setFavorites([]);
                    }
                },
                onError: (error) => {
                    console.error("Error removing favorite:", error);
                    setErrorMessage("Error al eliminar el favorito.");
                },
            }
        );
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
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
            {favorites.length === 0 ? (
                <div className="alert alert-info">
                    No hay películas favoritas
                </div>
            ) : (
                <div
                    className="container"
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        rowGap: "gap",
                        gap: 1,
                    }}
                >
                    {favorites.map((film) => (
                        <div key={film.movie_id || film.id}>
                            <MovieCard film={film} />
                            <button
                                className="favorite-button"
                                onClick={() => onRemoveFavorite(film)}
                                disabled={processing}
                                style={{
                                    color: "red",
                                    zIndex: 1000,
                                    fontSize: 24,
                                }}
                            >
                                {processing ? "Borrando..." : <FaHeart />}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default MyFavorites;
