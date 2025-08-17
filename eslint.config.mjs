// ESLint v9 flat config (TypeScript + React, lightweight)
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  // 1) Ignore generated/output
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/node_modules/**'
    ]
  },

  // 2) Base JS rules
  js.configs.recommended,

  // 3) TS rules (non type-checked for speed)
  ...tseslint.configs.recommended,

  // 4) React/JSX layer
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // <— ensure plugin is registered
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/prop-types': 'off'
    }
  },

  // 5) Storybook config files: allow `any` to keep decorators simple
  {
    files: ['apps/storybook/.storybook/**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
