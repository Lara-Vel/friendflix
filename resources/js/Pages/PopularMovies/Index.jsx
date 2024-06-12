import { Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

// Componente para renderizar cada tarjeta de película
const MovieCard = ({ film, isFavorite, onAddFavorite }) => {
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

const PopularMovies = ({ auth, films, favourites }) => {
    const filmsResults = films?.results || [];
    const totalPages = films ? films.total_pages : 1;
    const currentPage = films ? films.page : 1;

    const [favorites, setFavorites] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    setTimeout(() => {
        setFavorites(favourites);
        localStorage.setItem("favorites", JSON.stringify(favourites));
    }, 1000);

    const onAddFavorite = (film) => {
        Inertia.post(
            "/favouritesToggle",
            { movie_id: film.id, filmData: film },
            {
                onSuccess: (page) => {
                    console.log("Favorite toggled successfully");

                    setFavorites(page.props.favorites);

                    Inertia.reload();

                    const favoritosLocalStorage =
                        localStorage.getItem("favorites");

                    if (favoritosLocalStorage) {
                        const filtered = favorites.filter(
                            (favorite) => favorite.movie_id !== film.id
                        );
                        setFavorites(filtered);
                        localStorage.setItem(
                            "favorites",
                            JSON.stringify(filtered)
                        );
                    }
                },
                onError: (error) => {
                    console.error("Error toggling favorite:", error);
                },
            }
        );
    };

    const checkIfFavorite = () => {
        favorites.forEach((favorite) => {
            filmsResults.map((film) => {
                if (film.id === favorite.movie_id) {
                    film["isFavorite"] = true;
                }
            });
        });
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
                    <>
                        <MovieCard
                            key={`popular-${film.id}`}
                            film={film}
                            isFavorite={checkIfFavorite(film.id)}
                            onAddFavorite={onAddFavorite}
                        />
                        <button
                            className="favorite-button"
                            onClick={() => onAddFavorite(film)}
                            style={{
                                color: film.isFavorite ? "red" : "gray",
                                zIndex: 1000,
                                fontSize: 24,
                            }}
                        >
                            {film.isFavorite ? <FaHeart /> : <CiHeart />}
                        </button>
                    </>
                ))}
            </div>
            {/* <div className="container">
                <h2>Tus favoritos:</h2>
                <ul>
                    {
                        favorites.map((favorite) => (
                            <MovieCard key={favorite.id} film={favorite} />
                        ))
                    }
                </ul>
            </div> */}
            <div className="pagination">
                {currentPage > 1 && (
                    <>
                        {!Inertia.resolveComponent ? (
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
                        {!Inertia.resolveComponent ? (
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

// import { Link } from "@inertiajs/react";
// import { useState, useEffect } from "react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import { usePage } from "@inertiajs/react";

// const MovieCard = ({ film, isFavourite, handleFavouriteChange }) => {
//     const user_id = usePage().props.auth.user.id;
//     console.log(`PopularMovie@Index.jxs. user_id =-${user_id}-`);

//     return (
//         <div className="movie-container">
//             <div className="movie-card">
//                 <img
//                     src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
//                     alt={film.title}
//                     className="poster-image"
//                 />
//                 <div className="overlay">
//                     <img
//                         src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`}
//                         alt={`${film.title} backdrop`}
//                         className="backdrop-image"
//                     />
//                     <div className="movie-details">
//                         <p>{film.overview}</p>
//                     </div>
//                 </div>
//             </div>
//             <button onClick={(e) => handleFavouriteChange(e, film.id)}>
//                 {isFavourite ? <FaHeart /> : <CiHeart />}
//             </button>

//             <h3 className="title">{film.title}</h3>
//         </div>
//     );
// };

// const PopularMovies = ({ auth, films }) => {
//     const filmsResults = films?.results || [];
//     const totalPages = films ? films.total_pages : 1;
//     const currentPage = films ? films.page : 1;

//     const [favourites, setFavourites] = useState([]);

//     useEffect(() => {
//         axios
//             .get(`/favourites/${auth.user.id}`)
//             .then((response) => {
//                 setFavourites(response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching favourites", error);
//             });
//     }, [auth.user.id]);

//     const handleFavouriteChange = (event, movie_id) => {
//         console.log(`handleFavouriteChange -${movie_id}-`);
//         event.stopPropagation();
//         const isCurrentFavourite = favourites.includes(movie_id);
//         if (isCurrentFavourite) {
//             axios
//                 .get(`/delFavourite/${auth.user.id}/${movie_id}`)
//                 .then(() => {
//                     setFavourites(favourites.filter((id) => id !== movie_id));
//                 })
//                 .catch((error) => {
//                     console.error("Error removing favourite", error);
//                 });
//         } else {

//             axios
//                 .get(`/addFavourite/${auth.user.id}/${movie_id}`)
//                 .then(() => {
//                     setFavourites([...favourites, movie_id]);
//                 })
//                 .catch((error) => {
//                     console.error("Error adding favourite " + error);
//                 });
//         }
//     };

//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={
//                 <h2 className="font-semibold text-xl text-gray-800 leading-tight">
//                     Películas
//                 </h2>
//             }
//         >
//             <div className="movies-grid">
//                 {filmsResults.map((film) => (
//                     <MovieCard
//                         key={film.id}
//                         film={film}
//                         isFavorite={favourites.includes(film.id)}
//                         handleFavouriteChange={handleFavouriteChange}
//                     />
//                 ))}
//             </div>
//             <div className="pagination">
//                 {currentPage > 1 && (
//                     <Link href={`/peliculas?page=${currentPage - 1}`}>
//                         &laquo; Previous
//                     </Link>
//                 )}
//                 {currentPage < totalPages && (
//                     <Link href={`/peliculas?page=${currentPage + 1}`}>
//                         Next &raquo;
//                     </Link>
//                 )}
//             </div>
//         </AuthenticatedLayout>
//     );
// };

// export default PopularMovies;
