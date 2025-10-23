import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins-Regular", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                lightBlue: "#C3E2DC",
                darkOrange: "#F37136",
                darkGrey: "#9597A1",
                lightGrey:"#E2DEE9",
                darkBlue: "#052348",
                skyBlue: "#8798AD",
            },
        },
    },

    plugins: [forms],
};
