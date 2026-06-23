import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    conditions: ["development", "import", "module", "browser", "default"],
  },
  server: {
    port: Number(process.env.PORT) || 5173,
  },
});
