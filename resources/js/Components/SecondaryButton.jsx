export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <button
                    {...props}
            className={`button ${disabled && "opacity-25"} ` + className}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
