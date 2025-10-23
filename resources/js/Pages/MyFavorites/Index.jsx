import { router, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Heart from "@/assets/icons/heart.svg?react";

const MovieCard = ({ film, processing, onRemoveFavorite }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="movie-container">
            <div className="movie-card">
                <button
                    className="favourite-button favourite-button--topright"
                    onClick={() => onRemoveFavorite(film)}
                    disabled={processing}
                    style={{
                        color: "red",
                        zIndex: 1000,
                        fontSize: 24,
                    }}
                >
                    {processing ? (
                        "Borrando..."
                    ) : (
                        <Heart className="heart-icon" />
                    )}
                </button>
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
                    <div
                        className={`movie-details ${
                            showDetails ? "expanded" : ""
                        }`}
                    >
                        <p>{film.overview}</p>
                        <button
                            className="cta-secondary"
                            onClick={handleShowDetails}
                        >
                            {showDetails ? "Ver menos" : "Ver más detalles"}
                        </button>
                    </div>
                </div>
            </div>
            <div className="movie-card-title-favourites">
                <h3 className="title">{film.title}</h3>
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
            <Head title="Mis películas favoritas">
                <meta
                    name="description"
                    content="Mis películas favoritas para compartir en Friendflix."
                />
            </Head>
            <h2 className="container-text-favourites">
                {" "}
                <span className="container-text-favourites-firsttext">
                    Mis películas
                </span>{" "}
                <span className="container-text-favourites-secondtext">
                    favoritas
                </span>{" "}
            </h2>
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
            {favorites.length === 0 ? (
                <div className="alert-info">
                    <p className="alert-message-info">
                        No hay películas favoritas
                    </p>
                    <img
                        src="/images/Friendflix-sad.webp"
                        alt="Icono de Friendflix triste"
                    />
                </div>
            ) : (
                <div className="movies-grid-favourites">
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
