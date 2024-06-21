import { router, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ film, processing, onRemoveFavorite }) => {
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
        </div>
    );
};

const MyFavorites = ({ auth, favourites }) => {
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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Mis películas favoritas - Friendflix">
                <meta
                    name="description"
                    content="Mis películas favoritas para compartir en Friendflix."
                />
            </Head>
            <h2 className="home-container-text">
                {" "}
                <span className="home-container-firsttext font-semibold text-xl text-gray-800 leading-tight">
                    Mis películas
                </span>{" "}
                <span className="home-container-secondtext font-semibold text-xl text-gray-800 leading-tight">
                    favoritas
                </span>{" "}
            </h2>
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
            {favorites.length === 0 ? (
                <div className="alert alert-info">
                    No hay películas favoritas
                </div>
            ) : (
                <div className="movies-grid">
                    {favorites.map((film) => (
                        <MovieCard
                            key={film.movie_id || film.id}
                            film={film}
                            onRemoveFavorite={onRemoveFavorite}
                        />
                    ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default MyFavorites;
