import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import securityPlugin from "eslint-plugin-security"
import unicornPlugin from "eslint-plugin-unicorn"
import tseslint from "typescript-eslint"

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "packages/proto/gen/**", "**/*.config.js"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // Security best practices
  securityPlugin.configs.recommended,
  // Unicorn rules for modern JS practices
  unicornPlugin.configs.recommended,
  // Custom rules
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
    },
  },
  eslintConfigPrettier,
]
