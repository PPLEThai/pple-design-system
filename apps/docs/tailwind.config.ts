import type { Config } from "tailwindcss";
import preset from "@pplethai/components/tailwind-preset";
import animate from "tailwindcss-animate";

const config: Config = {
  presets: [preset as Config],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../packages/components/src/**/*.{ts,tsx}",
  ],
  plugins: [animate],
};

export default config;
