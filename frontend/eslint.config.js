import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    /* src/data is read by two runtimes: the browser renders from it, and
       scripts/generate-static-routes.mjs imports the same modules under Node
       to write every route's head into the built HTML. So these files may
       reach for `process.env` — which the browser globals alone would flag —
       to resolve the deployment's own domain. See src/data/site-url.js. */
    files: ['src/data/**/*.js', 'vite.config.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
])
