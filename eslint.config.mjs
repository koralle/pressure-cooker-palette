import eslint from '@eslint/js'
import pluginNext from '@next/eslint-plugin-next'
import pluginImport from 'eslint-plugin-import'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginTestingLibrary from 'eslint-plugin-testing-library'
import pluginVitest from 'eslint-plugin-vitest'
import globals from 'globals'
import {
  config as tseslintConfig,
  configs as tseslintConfigs,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from 'typescript-eslint'

const baseConfigs = [
  {
    files: ['**/*.{ts,tsx,cts,mts,d.ts}'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 10,
        project: './tsconfig.json',
      },
      globals: {
        ...globals.es6,
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslintPlugin,
    },
    rules: {
      ...eslint.configs.recommended.rules,
      ...tseslintConfigs.recommended.rules,
    },
  },
]

const reactConfigs = [
  {
    files: ['**/*.{ts,tsx,cts,mts,d.ts}'],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

const importConfigs = [
  {
    files: ['**/*.{ts,tsx,cts,mts,d.ts}'],
    plugins: { import: pluginImport },
    rules: {
      ...pluginImport.configs.recommended.rules,
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx', '.cts', '.mts', '.d.ts'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.cjs', '.mjs', '.ts', '.tsx', '.cts', '.mts', '.d.ts'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
]

const vitestConfigs = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: { vitest: pluginVitest },
    rules: {
      ...pluginVitest.configs.recommended.rules,
    },
  },
]

const testingLibraryConfigs = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: {
      'testing-library': pluginTestingLibrary,
    },
    rules: {
      ...pluginTestingLibrary.configs.react.rules,
    },
  },
]

export default tseslintConfig(
  {
    ignores: [
      'pnpm-lock.yaml',
      '.next',
      '.vercel',
      '.wrangler',
      'build',
      'dist',
      'docs',
      'node_modules',
      'public',
    ],
  },
  ...baseConfigs,
  ...importConfigs,
  ...reactConfigs,
  ...vitestConfigs,
  ...testingLibraryConfigs,
)
