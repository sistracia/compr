const extendsConfig = [
  "eslint:recommended",
  "plugin:@typescript-eslint/recommended",
  "plugin:react/recommended",
  "prettier",
  "turbo",
];

module.exports = {
  extends: extendsConfig,
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  root: true,
  rules: {
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  overrides: [
    {
      files: ["apps/**/*"],
      extends: [...extendsConfig, "next/core-web-vitals"],
    },
  ],
};
