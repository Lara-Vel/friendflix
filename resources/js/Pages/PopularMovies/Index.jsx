import { router, Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import StarRating from "@/Components/StarRating";
import Pagination from "@/Components/Pagination";
import Heart from "@/assets/icons/heart.svg?react";
import PopularSkeletonCard from "@/Components/PopularSkeletonCard";

const MovieCard = ({ film, isFavorite, onAddFavorite, processing }) => {
    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    };

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
            <div className="movie-card-title">
                <div className="movie-card-head">
                    <h3 className="title">{film.title}</h3>

                    <button
                        className="favourite-button"
                        onClick={() => onAddFavorite(film)}
                        disabled={processing}
                        style={{
                            color: isFavorite ? "red" : "gray",
                            zIndex: 1000,
                            fontSize: 24,
                        }}
                    >
                        {isFavorite ? (
                            <Heart className="heart-icon heart-icon--active" />
                        ) : (
                            <Heart className="heart-icon heart-icon--inactive" />
                        )}
                    </button>
                </div>
                <div className="star-rating">
                    <StarRating rating={film.vote_average} />
                </div>
            </div>
        </div>
    );
};

const PopularMovies = ({ auth, films, favourites }) => {
    const filmsResults = films?.results || [];
    const totalPages = films ? films.total_pages : 1;
    const currentPage = films ? films.page : 1;
    const skeletonCount = Math.min(filmsResults.length || 15, 15);

    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState(null);

    const [loadingList, setLoadingList] = useState(false);

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
                    setError(null);
                },
                onError: () => {
                    setError(
                        "Error al actualizar los favoritos. Inténtalo de nuevo."
                    );
                },
            }
        );
    };

    const isFavorite = (movieId) => {
        return favorites.some((favorite) => favorite.movie_id === movieId);
    };

    const showSkeleton = loadingList || filmsResults.length === 0;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Películas populares">
                <meta
                    name="description"
                    content="Explora las películas más populares y en tendencia en Friendflix. Encuentra tus favoritas y descubre nuevas."
                />
            </Head>
            <h2 className="container-text-popular">
                <div className="container-text-popular-firsttext">
                    ¿No te decides?
                </div>
                <div className="container-text-popular-firsttext">
                    Descubre{" "}
                    <span className="container-text-popular-secondtext">
                        nuestras
                    </span>{" "}
                    <span className="container-text-popular-firsttext">
                        recomendaciones
                    </span>
                </div>
            </h2>
            {showSkeleton ? (
                <div className="movies-grid" aria-busy={showSkeleton}>
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                        <PopularSkeletonCard key={`p-sk-${i}`} />
                    ))}
                </div>
            ) : (
                <div className="movies-grid">
                    {filmsResults.map((film) => (
                        <MovieCard
                            key={film.id}
                            film={film}
                            vote_average={film.vote_average}
                            isFavorite={isFavorite(film.id)}
                            onAddFavorite={onAddFavorite}
                        />
                    ))}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNavigateStart={() => setLoadingList(true)}
                onNavigateFinish={() => setLoadingList(false)}
            />
        </AuthenticatedLayout>
    );
};

export default PopularMovies;
