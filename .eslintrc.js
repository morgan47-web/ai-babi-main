module.exports = {
  plugins: ["@stylistic", "@typescript-eslint", "readable-tailwind"],
  rules: {
    "prettier/prettier": ["error", { singleQuote: false, semi: false }],
    "readable-tailwind/multiline": [
      "error",
      {
        printWidth: 80,
      },
    ],
    semi: ["error", "never"],
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "next/core-web-vitals",
    "next/typescript",
    "plugin:readable-tailwind/warning",
  ],
}
