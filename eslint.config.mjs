// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { FlatCompat } from "@eslint/eslintrc";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const config = [
  { ignores: ["**/*", "!src/**"] },
  ...compat.extends("typescript", "prettier"),
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooksPlugin,
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSortPlugin,
    },

    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "prettier/prettier": "warn",
    },
  },
  ...storybook.configs["flat/recommended"]
];

export default config;
