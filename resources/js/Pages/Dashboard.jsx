import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserFavouritesModal from "@/Components/UserFavouritesDetail";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

export default function Dashboard({ auth, groupedFavourites }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (user, movies) => {
        setSelectedUser(user);
        setSelectedMovies(movies);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setSelectedMovies([]);
        setIsModalOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Inicio - Friendflix">
                <meta
                    name="description"
                    content="Descubre las películas que ven tus amigos en Friendflix. Explora sus recomendaciones y encuentra nuevas historias para disfrutar juntos."
                />
            </Head>

            <div className="home-container py-12">
                <div className="home-container-image bg-white overflow-hidden shadow-sm">
                    <img
                        src="images/Home-Friendflix.gif"
                        alt="Bienvenido a Friendflix, descrubre, comparte y decide - Ilustración de chico comiendo palomitas mientras ve la tele al aire libre con nubes y globos aerostáticos."
                        loop
                    />
                </div>
                <h2 className="home-container-text">
                    {" "}
                    <span className="home-container-firsttext font-semibold text-xl text-gray-800 leading-tight">
                        ¿Cómo
                    </span>{" "}
                    <span className="home-container-secondtext font-semibold text-xl text-gray-800 leading-tight">
                        funciona?
                    </span>{" "}
                </h2>
                <div className="home-container-icons bg-white overflow-hidden shadow-sm">
                    <div className="icon-container">
                        <img
                            src="/images/Icon-1.webp"
                            alt="Personaliza tu perfil-Icono de corazón"
                        />
                        <h3>PERSONALIZA TU PERFIL</h3>
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
                        <h3>CURIOSEA LAS RECOMENDACIONES DE TUS AMIGOS</h3>
                        <p>
                            Explora las recomendaciones de tus amigos y descubre
                            qué les gusta. ¡La mejor recomendación siempre viene
                            de quienes te conocen bien!
                        </p>
                    </div>
                    <div className="icon-container">
                        <img
                            src="/images/Icon-3.webp"
                            alt="Decide que ver hoy-Icono de cartel de movie night"
                        />
                        <h3>DECIDE QUÉ VER HOY</h3>
                        <p>
                            ¿No te decides? Echa un vistazo a nuestras
                            sugerencias de películas del momento y deja de
                            perder tiempo buscando.
                        </p>
                    </div>
                </div>

                <h2 className="home-container-text" id="amigos">
                    {" "}
                    <span className="home-container-firsttext font-semibold text-xl text-gray-800 leading-tight">
                        Recomendaciones de
                    </span>{" "}
                    <span className="home-container-secondtext font-semibold text-xl text-gray-800 leading-tight">
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
                                    openModal(favourite.user, favourite.movies)
                                }
                            >
                                {favourite.movies &&
                                favourite.movies.length > 0 ? (
                                    <>
                                        <img
                                            src={favourite.movies[0].image}
                                            alt={favourite.movies[0].title}
                                        />
                                        <div className="friends-card-text">
                                            <h3>{favourite.user}</h3>
                                            <div className="friends-card-movies">
                                                {favourite.movies.map(
                                                    (movie, index) => (
                                                        <p key={index}>
                                                            {movie.title}
                                                        </p>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <FaEllipsisH className="more-icon" />
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
            />
        </AuthenticatedLayout>
    );
}
