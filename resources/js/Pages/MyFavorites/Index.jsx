import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FaHeart } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";

const MovieCard = ({ film, onRemoveFavorite }) => {
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
                onClick={() => onRemoveFavorite(film)}
                style={{ color: "red" }}
            >
                <FaHeart />
            </button>
        </div>
    );
};

const MyFavorites = ({ auth, favourites }) => {
    const [favorites, setFavorites] = useState(favourites || []);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!favourites || favourites.length === 0) {
            setErrorMessage("No hay favoritos");
        } else {
            setFavorites(favourites);
        }
    }, [favourites]);

    const onRemoveFavorite = (movie) => {
        console.log(`Intentando borrar el favorito con ID: ${movie_id}`);
        Inertia.delete(`/favourites/${movie_id}`, {
            onSuccess: () => {
                setFavorites(favorites.filter((fav) => fav.id !== movie_id));
                console.log("Favorite removed successfully");
            },
            onError: (error) => {
                console.error("Error removing favorite:", error);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Mis Películas Favoritas
                </h2>
            }
        >
            {errorMessage && (
                <div className="alert alert-danger">{errorMessage}</div>
            )}
            <div className="movies-grid">
                {favorites.map((film) => (
                    <MovieCard
                        key={film.id}
                        film={film}
                        onRemoveFavorite={onRemoveFavorite}
                    />
                ))}
            </div>
        </AuthenticatedLayout>
    );
};

export default MyFavorites;

// inicio de código antiguo

// const MovieCard = ({ film, isFavorite, onAddFavorite }) => {
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
//             <h3 className="title">{film.title}</h3>
//         </div>
//     );
// };

// const MyFavorites = ({ auth, films, favourites }) => {
//     const filmsResults = films?.results || [];
//     const totalPages = films ? films.total_pages : 1;
//     const currentPage = films ? films.page : 1;

//     const [favorites, setFavorites] = useState([]);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");

//     setTimeout(() => {
//         setFavorites(favourites);
//         const userFilms = localStorage.getItem("favorites");
//         if (JSON.parse(userFilms).length > 0) {
//             setFavorites(JSON.parse(userFilms));
//         } else {
//             setErrorMessage("No hay favoritos");
//         }
//     }, 1000);

//     const onAddFavorite = (film) => {
//         const favoritosLocalStorage = localStorage.getItem("favorites");

//         if (JSON.parse(favoritosLocalStorage).length > 0) {
//             const favoritos = JSON.parse(favoritosLocalStorage);
//             const filtered = favoritos.filter(
//                 (favorite) => favorite.movie_id !== film.movie_id
//             );
//             setFavorites(filtered);
//             localStorage.setItem("favorites", JSON.stringify(filtered));
//         }

//         router.post(
//             route("favourites.toggle"),
//             { movie_id: film.id, filmData: film },
//             {
//                 onSuccess: (page) => {
//                     console.log("Favorite toggled successfully");

//                     setFavorites(page.props.favorites);
//                 },
//                 onError: (error) => {
//                     console.error("Error toggling favorite:", error);
//                 },
//             }
//         );
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
//             {errorMessage && (
//                 <div className="alert alert-danger">{errorMessage}</div>
//             )}
//             {favorites && favorites.length > 0 && (
//                 <div
//                     className="container"
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-evenly",
//                         rowGap: "gap",
//                         gap: 1,
//                     }}
//                 >
//                     {favorites &&
//                         favorites.map((film) => (
//                             <div key={film.id}>
//                                 <MovieCard film={film} />
//                                 <button
//                                     className="favorite-button"
//                                     onClick={() => onAddFavorite(film)}
//                                     style={{
//                                         color: true ? "red" : "gray",
//                                         zIndex: 1000,
//                                         fontSize: 24,
//                                     }}
//                                 >
//                                     {true ? <FaHeart /> : <CiHeart />}
//                                 </button>
//                             </div>
//                         ))}
//                 </div>
//             )}
//         </AuthenticatedLayout>
//     );
// };

// export default MyFavorites;

// fin de código antiguo
