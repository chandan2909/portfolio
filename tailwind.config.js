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
                'surface': '#F8F7F4',
                'surface-alt': '#EFEEEA',
            },
            fontFamily: {
                sans: ['"Instrument Sans"', 'sans-serif'],
                display: ['"Bricolage Grotesque"', '"Instrument Sans"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
