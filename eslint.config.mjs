import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create the compat instance with base directory
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Extend ESLint configuration from Next.js base configs
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    // You can add custom ESLint rules here
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Customize rule
      "@typescript-eslint/no-unused-vars": [
        "warn", 
        { "varsIgnorePattern": "^_" } // Ignore unused vars starting with "_"
      ],
      "no-var": "error", // Enforce 'let' or 'const' over 'var'
    },
  },
];

export default eslintConfig;
