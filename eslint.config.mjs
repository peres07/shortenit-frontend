import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // adiciona o plugin e as regras
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Pacotes. React primeiro, depois outros.
            ["^react", "^@?\\w"],
            // Imports internos (ex: @, components)
            ["^(@|components)(/.*|$)"],
            // Imports com efeitos colaterais (ex: polyfills)
            ["^\\u0000"],
            // Imports de pastas acima (..)
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Imports relativos
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Imports de estilos
            ["^.+\\.?(css)$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
];

export default eslintConfig;
