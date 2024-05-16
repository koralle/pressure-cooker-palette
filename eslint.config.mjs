import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import testingLibrary from 'eslint-plugin-testing-library'
import vitest from 'eslint-plugin-vitest'
import globals from 'globals'
import {
  config as tseslintConfig,
  configs as tseslintConfigs,
  parser as tseslintParser,
  plugin as tseslintPlugin,
} from 'typescript-eslint'

const reactCompat = new FlatCompat({
  recommendedConfig: pluginReact.configs.recommended,
})

const reactHooksCompat = new FlatCompat({
  recommendedConfig: pluginReactHooks.configs.recommended,
})

const testingLibraryCompat = new FlatCompat({
  recommendedConfig: {
    extends: testingLibrary.configs.recommended,
  },
})

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
    ...reactCompat.config({
      settings: {
        react: {
          version: 'detect',
        },
      },
    })[0],
  },
  {
    files: ['**/*.{ts,tsx,cts,mts,d.ts}'],
    ...reactHooksCompat.config({
      settings: {
        react: {
          version: 'detect',
        },
      },
    })[0],
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
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    ...testingLibraryCompat.config({})[0],
  },
]

export default tseslintConfig(
  {
    ignores: [
      '.next',
      '**/dist',
      'node_modules',
      'build',
      'pnpm-lock.yaml',
      'app/entry.server.tsx',
      'functions',
      'load-context.ts',
      'worker-configuration.d.ts',
    ],
  },
  ...baseConfigs,
  ...reactConfigs,
  ...vitestConfigs,
  ...testingLibraryConfigs,
)
