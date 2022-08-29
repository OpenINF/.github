'use strict';

module.exports = {
  root: true,
  parserOptions: {
    project: require.resolve('./tsconfig.eslint.json'),
  },
  settings: {
    'import/resolver': 'node',
  },
  extends: [
    'eslint:recommended',
    'plugin:markdown/recommended',
    'plugin:prettier/recommended', // // Disables rules conflicting w/ Prettier.
  ],
  plugins: ['markdown', 'only-warn', 'prettier'],
  rules: {
    // core
    quotes: [1, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
  },
  overrides: [
    {
      // CommonJS files
      files: ['*.js', '*.cjs', '*.*.cjs'],
      env: { node: true },
    },
    {
      // TS files
      files: ['*.ts', '*.mts'],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
        'plugin:prettier/recommended', // Disables rules conflicting w/ Prettier.
      ],
    },
    {
      // JSON files
      files: [
        '.eslintrc',
        '.babelrc',
        '*.json',
        '*.json5',
        '*.jsonc',
        'OWNERS',
      ],
      parser: 'jsonc-eslint-parser',
      plugins: ['jsonc'],
      extends: [
        'plugin:jsonc/base',
        'plugin:jsonc/recommended-with-json', // JSON recommended config.
        'plugin:jsonc/recommended-with-jsonc', // JSONC recommended config.
        'plugin:jsonc/recommended-with-json5', // JSON5 recommended config.
        'plugin:jsonc/prettier', // Disables rules conflicting w/ Prettier.
      ],
    },
    {
      files: ['.*.jsonc', 'OWNERS'],
      rules: {
        'jsonc/no-comments': 0,
      },
    },
    {
      // ESM files
      files: ['**/*.mjs', 'eslint.config.js'],
      parser: '@babel/eslint-parser',
      parserOptions: {
        babelOptions: {
          configFile: './babel.config.json',
        },
      },
    },
  ],
};
