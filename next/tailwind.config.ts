import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                red: "#E43A05",
                green: "#20AB47",
                orange: "#FEA529",
                grey: {
                    0: "#EEEEEE",
                    100: "#22222A",
                },
            },
            fontSize: {
                xl: "32px",
                l: "24px",
                md: "20px",
            },
        },
    },
    plugins: [],
};
export default config;
