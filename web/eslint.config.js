import tseslint from "typescript-eslint";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default tseslint.config(
  {
    // Archivos y directorios que ESLint debe ignorar
    ignores: [
      "dist",
      "node_modules",
      "build",
      "coverage",
      "*.config.js",
      "*.config.mjs",
      "vitest.config.*",
      "eslint.config.js",
      "prettier.config.*",
      ".prettierrc",
    ],
  },
  // Reglas recomendadas de TypeScript + ESLint base
  ...tseslint.configs.recommended,
  {
    // Reglas específicas de React
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "react-refresh": eslintPluginReactRefresh,
    },
    rules: {
      // Reglas recomendadas de React Hooks
      ...eslintPluginReactHooks.configs.recommended.rules,
      // Solo exportar componentes en archivos con Fast Refresh (Vite)
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    // Variables globales del navegador disponibles en src/
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    // Desactivar no-unused-vars de ESLint; TypeScript (noUnusedLocals/noUnusedParameters)
    // ya lo cubre con mayor precisión en tiempo de compilación.
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);
