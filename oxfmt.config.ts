import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  sortPackageJson: true,
  sortTailwindcss: {
    stylesheet: "packages/components/src/styles/globals.css",
    functions: ["cn", "cva", "clsx"],
  },
  // Markdown is hand-written prose (AGENTS.md is the consumer reference); leave it as authored.
  ignorePatterns: ["**/dist/**", "**/*.md", ".changeset/**", "bun.lock"],
});
