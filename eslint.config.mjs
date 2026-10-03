import js from "@eslint/js";

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**"]
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        React: "readonly"
      }
    }
  }
];

export default eslintConfig;
