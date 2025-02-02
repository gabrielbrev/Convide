import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";
import { transform } from "next/dist/build/swc/generated-native";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                lightPink: "#DDB8EC",
            },
            animation: {
                moveUp: "moveUp 2s ease-in-out infinite alternate",
                shakeHorizontal: "shakeHorizontal 0.2s linear",
                expandHeight156: "expandHeight156 0.3s ease-in-out forwards",
            },
            keyframes: {
                moveUp: {
                    "0%": { transform: "translateY(0)" },
                    "100%": { transform: "translateY(-2.25rem)" },
                },
                shakeHorizontal: {
                    "0%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(2px)" },
                    "50%": { transform: "translateX(-2px)" },
                    "75%": { transform: "translateX(2px)" },
                    "100%": { transform: "translateX(0)" },
                },
                expandHeight156: {
                    "0%": { height: "0px" },
                    "100%": { height: "156px" },
                },
            },
            transitionTimingFunction: {
                backOut: "cubic-bezier(0.34, 1.27, 0.3, 1)",
            },
            backgroundImage: {
                "header-gradient":
                    "linear-gradient(90deg, #E8B7B8 0%, #F5BEE1 25%, #E7A8F0 50%, #C7AFF6 75%, #AAA7FE 100%)",
            },
        },
    },
    plugins: [scrollbarHide],
} satisfies Config;
