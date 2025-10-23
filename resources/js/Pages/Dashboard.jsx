import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserFavouritesModal from "@/Components/UserFavouritesDetail";
import ClockIcon from "@/assets/icons/clock.svg?react";
import MovieIcon from "@/assets/icons/movie.svg?react";
import ChevronRightIcon from "@/assets/icons/chevron-right.svg?react";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, groupedFavourites }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const openModal = (user, movies, avatar) => {
        setSelectedUser(user);
        setSelectedMovies(movies);
        setSelectedAvatar(avatar);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setSelectedMovies([]);
        setSelectedAvatar(null);
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inicio">
                <meta
                    name="description"
                    content="Descubre las películas que ven tus amigos en Friendflix. Explora sus recomendaciones y encuentra nuevas historias para disfrutar juntos."
                />
            </Head>

            <div className="home-container">
                <div
                    className="home-container-image"
                    role="img"
                    aria-label="Bienvenido a Friendflix, descubre, comparte y decide - Ilustración de chico comiendo palomitas mientras ve la tele al aire libre con nubes y globos aerostáticos."
                ></div>
                <h2 className="home-container-text">
                    {" "}
                    <span className="home-container-firsttext-welcome">
                        ¿Cómo
                    </span>{" "}
                    <span
                        className="home-container-secondtext-welcome"
                        id="iniciar"
                    >
                        funciona?
                    </span>{" "}
                </h2>
                <div className="home-container-icons overflow-hidden">
                    <div className="icon-container">
                        <img
                            src="/images/Icon-1.webp"
                            alt="Personaliza tu perfil-Icono de corazón"
                        />
                        <h3>Personaliza tu perfil</h3>
                        <p>
                            Actualiza tu perfil con tus películas favoritas.
                            ¡Deja que tus amigos vean lo que te encanta!
                        </p>
                    </div>
                    <div className="icon-container">
                        <img
                            src="/images/Icon-2.webp"
                            alt="Curiosea las recomendaciones de tus amigos-Icono de gafas 3D"
                        />
                        <h3>Curiosea las recomendaciones</h3>
                        <p>
                            Descubre las recomendaciones de tus amigos más
                            cercanos. ¡La mejor recomendación siempre viene de
                            quienes te conocen bien!
                        </p>
                    </div>
                    <div className="icon-container">
                        <img
                            src="/images/Icon-3.webp"
                            alt="Decide que ver hoy-Icono de cartel de movie night"
                        />
                        <h3>Decide qué ver hoy</h3>
                        <p>
                            ¿No te decides? Echa un vistazo a nuestras
                            sugerencias de películas del momento y deja de
                            perder tiempo buscando.
                        </p>
                    </div>
                </div>

                <h2 className="home-container-text-friends" id="amigos">
                    {" "}
                    <span className="home-container-firsttext-friends">
                        Recomendaciones de
                    </span>{" "}
                    <span className="home-container-secondtext-friends">
                        amigos
                    </span>{" "}
                </h2>
                <div className="container-friends-card">
                    {groupedFavourites && groupedFavourites.length > 0 ? (
                        groupedFavourites.map((favourite, index) => (
                            <div
                                key={index}
                                className="friends-card"
                                onClick={() =>
                                    openModal(
                                        favourite.user.name,
                                        favourite.movies,

                                        favourite.user.avatar
                                            ? `/storage/${favourite.user.avatar}`
                                            : "/storage/avatars/default.webp"
                                    )
                                }
                            >
                                {favourite.movies &&
                                favourite.movies.length > 0 ? (
                                    <>
                                        <div className="friends-card-content">
                                            <img
                                                src={
                                                    favourite.user.avatar
                                                        ? `/storage/${favourite.user.avatar}`
                                                        : "/storage/avatars/default.webp"
                                                }
                                                alt={favourite.user.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full mb-4 object-cover"
                                            />

                                            <div className="friends-card-text">
                                                <span className="friends-time">
                                                    <ClockIcon className="clock-icon" />
                                                    {favourite.lastUpdatedAt}
                                                </span>
                                                <h3>{favourite.user.name}</h3>
                                                <div className="friends-card-updated">
                                                    <div className="friends-favourites-badge">
                                                        <MovieIcon className="movie-icon" />
                                                        <span className="favourites-badge">
                                                            {
                                                                favourite.movies
                                                                    .length
                                                            }{" "}
                                                            favoritas
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-divider">
                                            <button
                                                className="more-button"
                                                onClick={() =>
                                                    openModal(
                                                        favourite.user.name,
                                                        favourite.movies,
                                                        favourite.user.avatar
                                                            ? `/storage/${favourite.user.avatar}`
                                                            : "/storage/avatars/default.webp"
                                                    )
                                                }
                                            >
                                                <span className="more-button-span">
                                                    Ver más
                                                </span>
                                                <ChevronRightIcon className="chevron-right-icon" />
                                            </button>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        ))
                    ) : (
                        <div className="alert-recommendations">
                            <p className="alert-message-recommendations">
                                No hay recomendaciones de películas de amigos.
                            </p>
                            <img
                                src="/images/Friendflix-sad.webp"
                                alt="Icono de Friendflix triste"
                            />
                        </div>
                    )}
                </div>
            </div>
            <UserFavouritesModal
                isOpen={isModalOpen}
                onClose={closeModal}
                user={selectedUser}
                movies={selectedMovies}
                avatar={selectedAvatar}
            />
        </AuthenticatedLayout>
    );
}
