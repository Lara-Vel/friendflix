import { Link } from "@inertiajs/react";
import Carousel from "@/Components/Carousel";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
            <>
                <div className="carousel-principal">
                    <Carousel />
                    <div className="auth-links">
                        <Link
                            as="button"
                            href={route("login")}
                            className="button button-welcome"
                        >
                            <span>Iniciar sesión</span>
                        </Link>
                        <Link
                            as="button"
                            href={route("register")}
                            className="button button-welcome"
                        >
                            <span>Crea tu cuenta</span>
                        </Link>
                    </div>
                </div>
            </>
    );
}
