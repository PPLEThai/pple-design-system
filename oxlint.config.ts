import { defineConfig } from "oxlint";

/**
 * Lint for the design system. Replaces the former ESLint setup
 * (typescript-eslint recommended + react-hooks + react-refresh + jsx-a11y) and adds
 * type-aware rules via tsgolint. Every rule is an error so CI fails instead of warning.
 */
export default defineConfig({
  plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "jsx-a11y", "import", "vitest"],
  categories: {
    correctness: "error",
    suspicious: "error",
  },
  env: { browser: true, es2024: true },
  settings: { react: { version: "19" } },
  ignorePatterns: ["**/dist/**", "**/node_modules/**"],
  options: {
    typeAware: true,
    typeCheck: true,
    maxWarnings: 0,
  },
  rules: {
    "typescript/no-explicit-any": "error",
    "typescript/ban-ts-comment": "error",
    "typescript/no-floating-promises": "error",
    "typescript/no-misused-promises": "error",
    "typescript/await-thenable": "error",
    "typescript/consistent-type-imports": "error",
    "typescript/no-unnecessary-type-assertion": "error",
    "unicorn/no-abusive-eslint-disable": "error",
    "react/rules-of-hooks": "error",
    "react/exhaustive-deps": "error",
    "react/jsx-key": "error",
    "react/react-in-jsx-scope": "off",
    "react/only-export-components": [
      "error",
      {
        allowConstantExport: true,
        allowExportNames: [
          "buttonVariants",
          "badgeVariants",
          "alertVariants",
          "iconVariants",
          "logoVariants",
          "useFormField",
          "spinnerVariants",
          "formatTime",
          "getNavbarVariant",
          "isInMiniAppUserAgent",
        ],
      },
    ],
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    // `x == null` is the intended null-or-undefined check.
    eqeqeq: ["error", "always", { null: "ignore" }],
    "import/no-unassigned-import": [
      "error",
      { allow: ["**/*.css", "@testing-library/jest-dom/vitest"] },
    ],

    // Backlog: these fire on pre-existing component logic and need a behaviour review
    // (React Compiler purity/effect rules, ARIA roles vs native tags, cast narrowing).
    // They were not enforced by the former ESLint config. Enable one at a time with a fix.
    "react/purity": "off",
    "react/set-state-in-effect": "off",
    "react/refs": "off",
    "react/exhaustive-effect-dependencies": "off",
    "react/no-unstable-nested-components": "off",
    "jsx-a11y/prefer-tag-over-role": "off",
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/consistent-return": "off",
    "no-shadow": "off",
  },
  overrides: [
    {
      files: ["**/*.test.{ts,tsx}", "**/test/**"],
      rules: {
        "typescript/no-non-null-assertion": "off",
        "vitest/require-mock-type-parameters": "off",
      },
    },
    {
      // Docs demo: `BreadcrumbPage_` mirrors the component name it documents.
      files: ["apps/docs/**"],
      rules: { "no-underscore-dangle": "off" },
    },
  ],
});
