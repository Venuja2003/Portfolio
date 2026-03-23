/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['Syne', 'sans-serif'],
                body: ['DM Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                void: '#030508',
                ink: '#080c14',
                obsidian: '#0d1117',
                steel: '#161b24',
                mist: '#1e2535',
                ghost: '#2a3347',
                silver: '#8892a4',
                frost: '#c8d6ef',
                ice: '#e8f0fd',
                arc: '#4f8fff',
                pulse: '#00d4ff',
                ember: '#ff6b35',
                neon: '#39ff9f',
                violet: '#8b5cf6',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                }
            },
            backgroundImage: {
                'grad-radial': 'radial-gradient(var(--tw-gradient-stops))',
            }
        },
    },
    plugins: [],
}