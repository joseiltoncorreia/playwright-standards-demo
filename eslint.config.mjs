// ESLint flat config for a Playwright + TypeScript automation project.
// Requires ESLint 9+. Start with these rules, then tune them together with the team.
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: [
      'tests/demo-violations.ts',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      'reports/**',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Rules for every automation file (tests, pages, fixtures, utils)
  {
    files: ['**/*.ts'],
    rules: {
      // Consistency and readability
      eqeqeq: 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Keeps helpers and page objects small and easy to reuse (supports DRY)
      'max-lines-per-function': ['warn', { max: 60, skipBlankLines: true, skipComments: true }],
      complexity: ['warn', 10],
      'max-depth': ['warn', 3],
    },
  },

  // Playwright rules, applied to the test folders
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.ts', 'pages/**/*.ts', 'fixtures/**/*.ts', 'utils/**/*.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,

      // Assertions belong in the test, not in helpers or page objects
      'playwright/no-standalone-expect': 'error',
      'playwright/expect-expect': 'error',

      // Stability: no fixed waits, no brittle patterns
      'playwright/no-wait-for-timeout': 'error',
      'playwright/no-networkidle': 'error',
      'playwright/no-force-option': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/no-page-pause': 'error',

      // Correctness
      'playwright/missing-playwright-await': 'error',
      'playwright/valid-expect': 'error',
      'playwright/no-useless-await': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-focused-test': 'error',

      // Clean tests
      'playwright/no-conditional-in-test': 'warn',
      'playwright/no-skipped-test': 'warn',
      'playwright/max-nested-describe': ['warn', { max: 2 }],
      'playwright/require-top-level-describe': 'warn',
    },
  },

  // Assertions belong in the tests, so page objects and utils may not import `expect`
  {
    files: ['pages/**/*.ts', 'utils/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@playwright/test',
              importNames: ['expect'],
              message:
                'Keep assertions in the test. Page objects and utils should return data or perform actions.',
            },
          ],
        },
      ],
    },
  },

  // Catches missing `await` on our own methods (e.g. page object calls). Needs type information.
  {
    files: ['tests/**/*.ts', 'pages/**/*.ts', 'fixtures/**/*.ts', 'utils/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // Turns off stylistic rules that conflict with Prettier. Keep this last.
  prettier,
);
