export default [
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2021, // Use ES2021 features
      sourceType: "module", // Use ES modules
    },
    rules: {
      "consistent-return": "error",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[source.value=/\\.(js|jsx|ts|tsx)$/]",
          message: "Import file extensions must be included.",
        },
        {
          selector: "ImportDeclaration[source.value=/^[^./]/]",
          message: "Packages should be imported without file extensions.",
        }
      ],
    },
  },
];
