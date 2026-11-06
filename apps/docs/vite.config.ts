import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    conditions: ["@pplethai/source", "import", "module", "browser", "default"],
  },
  server: {
    port: Number(process.env.PORT) || 5173,
  },
});
