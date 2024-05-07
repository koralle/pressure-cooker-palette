import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import vitest from 'eslint-plugin-vitest'
import globals from 'globals'
import {
  config as tseslintConfig,
  configs as tseslintConfigs,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from 'typescript-eslint'

const compat = new FlatCompat({})

const baseConfigs = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
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
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      'react/jsx-curly-brace-presence': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react-hooks/rules-of-hooks': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]

const vitestConfigs = [
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
]

const testingLibraryConfigs = [
  ...compat.extends('plugin:testing-library/react'),
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
  },
]

export default tseslintConfig(
  {
    ignores: ['.next', '**/dist', 'node_modules', 'build', 'pnpm-lock.yaml'],
  },
  ...baseConfigs,
  ...reactConfigs,
  ...vitestConfigs,
  ...testingLibraryConfigs,
)
