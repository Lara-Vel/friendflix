export default function PrimaryButton({
    className = "",
    disabled = false,
    type = "button",
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`button ${disabled ? "is-disabled" : ""} ${className}`.trim()}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}
