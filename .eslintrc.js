module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es2021: true,
    node: true,
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-inferrable-types": 1,
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
