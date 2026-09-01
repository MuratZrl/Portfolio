// eslint.config.mjs
//
// Native flat config. The previous version wrapped `next/core-web-vitals` and
// `next/typescript` in FlatCompat, which crashed ESLint 9 outright with
// "TypeError: Converting circular structure to JSON" while it tried to
// validate the eslintrc-shaped config — so no lint has ever actually run here.
//
// Both halves are replaced by their native flat equivalents:
//   next/core-web-vitals -> @next/eslint-plugin-next configs["core-web-vitals"]
//   next/typescript      -> typescript-eslint configs.recommended
//
// Both packages are declared directly in package.json rather than being taken
// transitively through eslint-config-next: this file imports them by name, so
// they are real dependencies and must not rely on npm hoisting to resolve.

import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },

  // TypeScript parsing plus the recommended rule set. This is what supplies the
  // parser for .ts/.tsx — without it ESLint falls back to espree and every
  // type annotation in the project is a syntax error.
  ...tseslint.configs.recommended,

  // The Next.js rules. configs["core-web-vitals"] is a bare flat config object
  // (name, plugins, rules) with no `files` key of its own, so scope it here.
  {
    ...nextPlugin.configs["core-web-vitals"],
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  },
];
