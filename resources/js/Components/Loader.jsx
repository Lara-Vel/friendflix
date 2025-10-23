import React from "react";

const Loader = ({
    show = true,
    size = 50,
    color = "var(--brand, #f37136)",
    overlay = true,
    label = "Cargando…",
}) => {
    if (!show) return null;

    const style = {
        "--size": `${size}px`,
        "--loader-color": color,
    };

    const content = (
        <span
            className="loader"
            role="status"
            aria-label={label}
            style={style}
        />
    );

    return overlay ? (
        <div className="loader-overlay" aria-live="polite">
            {content}
        </div>
    ) : (
        content
    );
};

export default Loader;
