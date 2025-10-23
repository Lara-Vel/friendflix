import { Link } from "@inertiajs/react";
import LinkedinIcon from "@/assets/icons/linkedin.svg?react";
import GithubIcon from "@/assets/icons/github.svg?react";
import EmailIcon from "@/assets/icons/email.svg?react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-logo">
                        <Link href="/inicio">
                            <img
                                src="/images/Logo-Friendflix.svg"
                                alt="Logo Friendflix"
                            />
                        </Link>
                    </div>

                    <nav className="footer-nav">
                        <Link href="/inicio">Iniciar</Link>
                        <Link href="/peliculas">Películas</Link>
                        <a href="/inicio#amigos">Amigos</a>
                        <Link href="/mis-favoritos">Mis favoritos</Link>
                        <Link href="/buscar-peliculas">Buscar</Link>
                        <Link href="/miperfil">Mi perfil</Link>
                    </nav>

                    <div className="footer-link">
                        <a
                            href="https://www.linkedin.com/in/lara-vel/"
                            target="_blank"
                            rel="noreferrer"
                            title="LinkedIn"
                        >
                            <LinkedinIcon className="linkedin-icon" />
                        </a>
                        <a
                            href="https://github.com/Lara-Vel"
                            target="_blank"
                            rel="noreferrer"
                            title="GitHub"
                        >
                            <GithubIcon className="github-icon" />
                        </a>
                        <a href="mailto:lara.vel@outlook.com" title="Contacto">
                            <EmailIcon className="email-icon" />
                        </a>
                    </div>
                </div>

                <div className="footer-text">
                    <p>
                        © 2024 Friendflix – Todos los derechos reservados. •
                        Hecho con ❤️ por Lara V.
                    </p>
                </div>
            </div>
        </footer>
    );
}
