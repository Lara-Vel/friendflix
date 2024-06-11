import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ film, isFavorite }) => {
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
                        <button>
                            {isFavorite ? <CiHeart /> : <FaHeart />}
                        </button>
                    </div>
                </div>
            </div>
            <h3 className="title">{film.title}</h3>
        </div>
    );
};

const PopularMovies = ({ auth, films }) => {
    const filmsResults = films?.results || [];
    const totalPages = films ? films.total_pages : 1;
    const currentPage = films ? films.page : 1;

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        Inertia.get(
            "/api/favoritos",
            {},
            {
                onSuccess: (page) => {
                    const favIds = page.props.favorites.map(
                        (fav) => fav.movie_id
                    );
                    setFavorites(favIds);
                },
            }
        );
    }, []);

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
                    <MovieCard key={film.id} film={film} />
                ))}
            </div>
            <div className="pagination">
                {currentPage > 1 && (
                    <Link href={`/peliculas?page=${currentPage - 1}`}>
                        &laquo; Previous
                    </Link>
                )}
                {currentPage < totalPages && (
                    <Link href={`/peliculas?page=${currentPage + 1}`}>
                        Next &raquo;
                    </Link>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default PopularMovies;
