/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./**/*.html",
        "./**/*.js",
        "!./node_modules/**"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["system-ui", "-apple-system", "sans-serif"],
            },
        },
    },
    plugins: [],
}
