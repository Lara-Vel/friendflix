import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const TvSeriesCard = ({ serie, isFavorite, onAddFavorite, processing }) => {
    return (
        <div className="movie-container">
            <div className="movie-card">
                <img
                    src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`}
                    alt={serie.title}
                    className="poster-image"
                />
                <div className="overlay">
                    <img
                        src={`https://image.tmdb.org/t/p/original${serie.backdrop_path}`}
                        alt={`${serie.title} backdrop`}
                        className="backdrop-image"
                    />
                    <div className="movie-details">
                        <p>{serie.overview}</p>
                    </div>
                </div>
            </div>
            <h3 className="title">{serie.title}</h3>
            <button
                className="favorite-button"
                onClick={() => onAddFavorite(serie)}
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

const PopularTvSeries = ({ auth, series, favourites }) => {
    const seriesResults = series?.results || [];
    const totalPages = series ? series.total_pages : 1;
    const currentPage = series ? series.page : 1;

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(favourites);
        localStorage.setItem("favorites", JSON.stringify(favourites));
    }, [favourites]);

    const onAddFavorite = (serie) => {
        router.post(
            route("favourites.toggle"),
            { tv_series_id: serie.id, serieData: serie },
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

    const isFavorite = (seriesId) => {
        return favorites.some((favorite) => tv_series_id === seriesId);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Series de TV
                </h2>
            }
        >
            <div className="movies-grid">
                {seriesResults.map((serie) => (
                    <TvSeriesCard
                        key={serie.id}
                        serie={serie}
                        isFavorite={isFavorite(serie.id)}
                        onAddFavorite={onAddFavorite}
                    />
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <>
                        {!router.resolveComponent ? (
                            <a href={`/series?page=${currentPage - 1}`}>
                                &laquo; Previous
                            </a>
                        ) : (
                            <Link href={`/series?page=${currentPage - 1}`}>
                                &laquo; Previous
                            </Link>
                        )}
                    </>
                )}
                {currentPage < totalPages && (
                    <>
                        {!router.resolveComponent ? (
                            <a href={`/series?page=${currentPage + 1}`}>
                                Next &raquo;
                            </a>
                        ) : (
                            <Link href={`/series?page=${currentPage + 1}`}>
                                Next &raquo;
                            </Link>
                        )}
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default PopularTvSeries;
