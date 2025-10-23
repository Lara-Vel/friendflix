import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import Footer from "@/Components/Footer";
import Toast from "@/Components/Toast";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { status, error, url} = usePage().props;

const toastMsg = error ?? status;
const toastType = error ? "error" : "success";

const [toastVersion, setToastVersion] = useState(0);
useEffect(() => {
    if (toastMsg) setToastVersion((v) => v + 1);
}, [toastMsg, url]);

const toastKey = `${url}-${toastVersion}`;
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 993) {
                setShowingNavigationDropdown(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.body.classList.toggle("menu-open", showingNavigationDropdown);
        return () => document.body.classList.remove("menu-open");
    }, [showingNavigationDropdown]);

    return (
        <div className="app-root">
            {toastMsg && <Toast key={toastKey} type={toastType} message={toastMsg} />}
            <nav className="main-nav">
                <div className="nav-container">
                    <div className="nav-content">
                        <div className="nav-links">
                            <NavLink
                                id="nav-starts"
                                className="nav-link"
                                href={route("dashboard") + "#iniciar"}
                                active={route().current("dashboard")}
                            >
                                Iniciar
                            </NavLink>
                            <NavLink
                                className="nav-link"
                                active={route().current("dashboard")}
                                href={route("dashboard") + "#amigos"}
                            >
                                Amigos
                            </NavLink>
                            <NavLink
                                className="nav-link"
                                href={route("popularmovies/index")}
                                active={route().current("popularmovies/index")}
                            >
                                Películas
                            </NavLink>
                            <div className="logo-container">
                                <Link href="/inicio">
                                    <ApplicationLogo />
                                </Link>
                            </div>
                            <div className="nav-links">
                                <NavLink
                                    className="nav-link"
                                    href={route("favourites.index")}
                                    active={route().current("favourites.index")}
                                >
                                    Mis favoritos
                                </NavLink>
                                <NavLink
                                    className="nav-link"
                                    href={route("searchmovies.search")}
                                    active={route().current(
                                        "searchmovies.index"
                                    )}
                                >
                                    Buscar
                                </NavLink>
                            </div>
                        </div>

                        <div className="user-dropdown-wrap">
                            <div>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="online-user">
                                            <button type="button">
                                                {user.name}
                                                <ChevronDownIcon className="chevron-down-icon" />
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Mi perfil
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Cerrar sesión
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="logo-container-2">
                            <Link href="/inicio">
                                <img
                                    src="/images/Logo-mobile.webp"
                                    alt="Logo Friendflix mobile"
                                />
                            </Link>
                        </div>
                        <div className="mobile-toggle">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                aria-expanded={showingNavigationDropdown}
                                aria-controls="mobileMenu"
                            >
                                <svg
                                    className="h-8 w-8"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    id="mobileMenu"
                    className={`hide-desktop ${
                        showingNavigationDropdown ? "is-open" : ""
                    }`}
                >
                    <div className="responsive-nav-text">
                        <ResponsiveNavLink
                            id="nav-responsive-starts"
                            href={route("dashboard") + "#iniciar"}
                            active={route().current("dashboard")}
                        >
                            Iniciar
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            active={route().current("dashboard")}
                            href={route("dashboard") + "#amigos"}
                        >
                            Amigos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("popularmovies/index")}
                            active={route().current("popularmovies/index")}
                        >
                            Películas
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("favourites.index")}
                            active={route().current("favourites.index")}
                        >
                            Mis favoritos
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route("searchmovies.search")}
                            active={route().current("searchmovies.index")}
                        >
                            Buscar
                        </ResponsiveNavLink>
                    </div>

                    <div className="resp-user">
                        <div className="resp-user-inner">
                            <div className="resp-user-name">{user.name}</div>
                            <div className="resp-user-email">{user.email}</div>
                        </div>

                        <div className="resp-user-actions">
                            <ResponsiveNavLink href={route("profile.edit")}>
                                Mi perfil
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Cerrar sesión
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="app-header">
                    <div className="app-header-inner">{header}</div>
                </header>
            )}

            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
