import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    form: "src/form/index.ts",
  },
  format: ["esm", "cjs"],
  // TypeScript 7 has no JS compiler API; rolldown-plugin-dts uses the tsgo backend for it.
  dts: true,
  sourcemap: true,
  clean: true,
  // Keep the 1.x file names (index.js / index.d.ts) so existing deep imports keep working.
  fixedExtension: false,
  external: [/^react($|\/)/, /^react-dom($|\/)/, "react-hook-form", "zod", /^@hookform\/resolvers/],
});
