import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Google-style rules
      indent: ["error", 2],
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "require-jsdoc": "off",
      "valid-jsdoc": "off",

      // Formatting
      "comma-dangle": ["error", "always-multiline"],
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "no-trailing-spaces": "error",
      "space-before-blocks": ["error", "always"],
      "keyword-spacing": ["error", { before: true, after: true }],

      // React-specific
      "react/self-closing-comp": "error",
      "react/jsx-closing-bracket-location": ["error", "line-aligned"],
      "react/jsx-curly-spacing": ["error", { when: "never", children: true }],
      "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-equals-spacing": ["error", "never"],
      "react/no-unescaped-entities": "warn",
      "react/jsx-boolean-value": ["error", "never"],
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
]);
