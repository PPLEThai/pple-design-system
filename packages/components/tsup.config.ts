import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    form: "src/form/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "react-hook-form",
    "zod",
    "@hookform/resolvers",
    "@hookform/resolvers/zod",
  ],
  treeshake: true,
});
