/**
 * @file Tests for reading links out of prose.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/shared/links.test
 */

import { deepStrictEqual } from 'node:assert/strict';
import { describe, test } from 'node:test';
import { urlsIn } from '@openinf/.github/build/links';

describe('urlsIn', () => {
  test('keeps a bracket the address opened', () => {
    deepStrictEqual(
      urlsIn('See https://example.com/Function_(mathematics) now.'),
      ['https://example.com/Function_(mathematics)']
    );
  });

  test('drops the bracket markdown closed', () => {
    deepStrictEqual(
      urlsIn('[F](https://example.com/Function_(mathematics)) and on.'),
      ['https://example.com/Function_(mathematics)']
    );
  });

  test('drops a plain markdown closer', () => {
    deepStrictEqual(urlsIn('[a](https://example.com/a)'), [
      'https://example.com/a',
    ]);
  });

  test('leaves an angle-bracketed autolink alone', () => {
    deepStrictEqual(urlsIn('<https://example.com/a>'), [
      'https://example.com/a',
    ]);
  });

  test('drops sentence punctuation', () => {
    deepStrictEqual(urlsIn('Go to https://example.com/a.'), [
      'https://example.com/a',
    ]);
    deepStrictEqual(urlsIn('https://example.com/a, then b.'), [
      'https://example.com/a',
    ]);
  });

  test('drops a reference-definition closer', () => {
    deepStrictEqual(urlsIn('[x]: https://example.com/a]'), [
      'https://example.com/a',
    ]);
  });

  test('finds several, in order', () => {
    deepStrictEqual(urlsIn('a https://one.example b https://two.example c'), [
      'https://one.example',
      'https://two.example',
    ]);
  });
});
