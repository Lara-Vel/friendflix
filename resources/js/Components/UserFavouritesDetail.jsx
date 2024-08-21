import { FaTimes } from "react-icons/fa";

export default function UserFavouritesDetail({
    isOpen,
    onClose,
    user,
    movies,
}) {
    if (!isOpen) return null;

    return (
        <div className="detail-overlay" onClick={onClose}>
            <div
                className="detail-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>{user}</h2>
                <div className="user-movies-list">
                    {movies.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="movie-poster"
                            />

                            <div className="details-movie">
                                <h3>{movie.title}</h3>
                                <p>{movie.overview}</p>
                                <span className="created-at">
                                    {"Añadida " + movie.createdAt}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
