/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#f97316', // Main orange
                    600: '#ea580c', // Dark orange
                    700: '#c2410c',
                    800: '#9a3412',
                    900: '#7c2d12',
                },
                brown: {
                    50: '#fef3c7',
                    100: '#fde68a',
                    200: '#fcd34d',
                    300: '#fbbf24',
                    400: '#f59e0b',
                    500: '#d97706',
                    600: '#b45309',
                    700: '#92400e', // Main brown
                    800: '#78350f', // Dark brown
                    900: '#451a03',
                },
            },
        },
    },
    plugins: [],
}
