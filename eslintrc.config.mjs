/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
import globals from "globals";

module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "semi": ["error", "always"],
  },
  env: {
    "browser": true,
    "node": true
  }
};

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
      }
    }
  }
];
