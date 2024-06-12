import { Link, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";

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
    const [errorMessage, setErrorMessage] = useState("");

    setTimeout(() => {
        setFavorites(favourites);
        const userFilms = localStorage.getItem("favorites");
        if (JSON.parse(userFilms).length > 0) {
            setFavorites(JSON.parse(userFilms));
        } else {
            setErrorMessage("No hay favoritos");
        }
    }, 1000);

    const onAddFavorite = (film) => {
        const favoritosLocalStorage = localStorage.getItem("favorites");

        if (JSON.parse(favoritosLocalStorage).length > 0) {
            const favoritos = JSON.parse(favoritosLocalStorage);
            const filtered = favoritos.filter(
                (favorite) => favorite.movie_id !== film.movie_id
            );
            setFavorites(filtered);
            localStorage.setItem("favorites", JSON.stringify(filtered));
        }

        router.post(
            route("favourites.toggle"),
            { movie_id: film.id, filmData: film },
            {
                onSuccess: (page) => {
                    console.log("Favorite toggled successfully");

                    setFavorites(page.props.favorites);
                },
                onError: (error) => {
                    console.error("Error toggling favorite:", error);
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
            {favorites && favorites.length > 0 && (
                <div
                    className="container"
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        rowGap: "gap",
                        gap: 1,
                    }}
                >
                    {favorites &&
                        favorites.map((film) => (
                            <div key={film.id}>
                                <MovieCard film={film} />
                                <button
                                    className="favorite-button"
                                    onClick={() => onAddFavorite(film)}
                                    style={{
                                        color: true ? "red" : "gray",
                                        zIndex: 1000,
                                        fontSize: 24,
                                    }}
                                >
                                    {true ? <FaHeart /> : <CiHeart />}
                                </button>
                            </div>
                        ))}
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default PopularMovies;

// import { Link } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";
// import { useState, useEffect } from "react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";

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

// const PopularMovies = ({ auth, films, favourites }) => {
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

//         Inertia.post(
//             "/favouritesToggle",
//             { movie_id: film.movie_id, filmData: film },
//             {
//                 onSuccess: (page) => {
//                     console.log("Favorite toggled successfully");

//                     setFavorites(page.props.favorites);

//                     Inertia.reload();
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
//             {favorites.length > 0 && (
//                 <div
//                     className="container"
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-evenly",
//                         rowGap: "gap",
//                         gap: 1,
//                     }}
//                 >
//                     {favorites.map((film) => (
//                         <>
//                             <MovieCard
//                                 key={`favourite-${film.id}`}
//                                 film={film}
//                             />
//                             <button
//                                 className="favorite-button"
//                                 onClick={() => onAddFavorite(film)}
//                                 style={{
//                                     color: true ? "red" : "gray",
//                                     zIndex: 1000,
//                                     fontSize: 24,
//                                 }}
//                             >
//                                 {true ? <FaHeart /> : <CiHeart />}
//                             </button>
//                         </>
//                     ))}
//                 </div>
//             )}
//         </AuthenticatedLayout>
//     );
// };

// export default PopularMovies;
