'use strict';

module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  overrides: [
    {
      files: '**/*.md',
      options: {
        parser: 'markdown',
        proseWrap: 'always',
      },
    },
    {
      files: ['OWNERS', '**/*.json'],
      options: {
        parser: 'json',
      },
    },
  ],
};
