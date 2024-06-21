import { Link, Head } from "@inertiajs/react";
import Carousel from "@/Components/Carousel";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <>
                <div className="carousel-principal">
                    <Carousel />
                    <div className="auth-links">
                        <Link
                            as="button"
                            href={route("login")}
                            className="button-login"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            as="button"
                            href={route("register")}
                            className="button-register"
                        >
                            Crea tu cuenta
                        </Link>
                    </div>
                </div>
            </>
        </>
    );
}
