import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            animation: {
                moveUp: "moveUp 2s ease-in-out infinite alternate",
            },
            keyframes: {
                moveUp: {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-2.25rem)" },
                },
            },
            transitionTimingFunction: {
                backOut: "cubic-bezier(0.34, 1.27, 0.3, 1)",
            },
        },
    },
    plugins: [],
} satisfies Config;
