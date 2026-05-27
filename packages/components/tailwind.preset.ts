import type { Config } from "tailwindcss";
import baseConfig from "./tailwind.config";

const preset: Partial<Config> = {
  darkMode: baseConfig.darkMode,
  theme: baseConfig.theme,
  plugins: baseConfig.plugins,
};

export default preset;
