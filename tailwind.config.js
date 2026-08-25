/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'dark-100': '#1C1917',
                'dark-200': '#292524',
                'dark-300': '#44403C',
                'surface': '#FAF8F5',
                'surface-alt': '#F0EDE8',
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
