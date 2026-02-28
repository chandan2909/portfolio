/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-100': '#1e293b',
                'dark-200': '#334155',
                'dark-300': '#475569',
            }
        },
    },
    plugins: [],
}
