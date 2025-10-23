import { useEffect, useState } from "react";
import TickCircle from "@/assets/icons/tick-circle.svg?react";
import CloseCircle from "@/assets/icons/close-circle.svg?react";

export default function Toast({
    message,
    type = "success",
    duration = 3000,
    onClose = null,
}) {
    const [open, setOpen] = useState(!!message);

    useEffect(() => {
        if (!message) return;
        setOpen(true);
        const id = setTimeout(() => {
            setOpen(false);
            onClose?.();
        }, duration);
        return () => clearTimeout(id);
    }, [message, duration, onClose]);

    if (!message) return null;

    const classes = [
        "toast",
        `toast--${type}`,
        open ? "toast--visible" : "",
    ].join(" ");
    const assertive = type === "error";
    return (
        <div
            className={classes}
            role={assertive ? "alert" : "status"}
            aria-live={assertive ? "assertive" : "polite"}
        >
            <span className="toast__icon" aria-hidden="true">
                {type === "success" ? (
                    <TickCircle className="tick-circle-icon" />
                ) : (
                    <CloseCircle className="error-circle-icon" />
                )}
            </span>

            <div className="toast__text">{message}</div>

            <button
                className="toast__close"
                onClick={() => {
                    setOpen(false);
                    onClose?.();
                }}
                aria-label="Cerrar notificación"
                title="Cerrar"
            >
                <CloseCircle className="close-circle-icon" />
            </button>
        </div>
    );
}
