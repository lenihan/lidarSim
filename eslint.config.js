import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.mtsx'],
    ignores: ['node_modules', 'dist'],
    rules: {
      // Add or customize rules here (e.g., for stricter checks)
      '@typescript-eslint/no-unused-vars': 'warn',
      // More rules: https://typescript-eslint.io/rules/
    },
  }
);