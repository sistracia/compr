module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
    "turbo",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // suppress errors for missing 'import React' in files
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
