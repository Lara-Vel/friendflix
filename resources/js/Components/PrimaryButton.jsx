export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`button ${disabled && "opacity-25"} ` + className}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
