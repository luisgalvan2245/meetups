import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import { FlatESLintConfig } from 'eslint-define-config'

const config: FlatESLintConfig[] = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/*.config.ts', '**/routes.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.*.json']
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin as any
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-unused-vars': 'off'
    }
  },
  {
    files: ['**/*.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin as any
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-unused-vars': 'off'
    }
  }
]

export default config
