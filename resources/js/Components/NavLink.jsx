import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`nav-links transition duration-150 ease-in-out ${
                active ? "active" : ""
            } ${className}`}
        >
            {children}
        </Link>
    );
}
