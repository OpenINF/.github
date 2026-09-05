/**
 * @file Finding the links in a piece of prose.
 * @author The OpenINF Authors & Friends
 * @license MIT OR Apache-2.0 OR BlueOak-1.0.0
 * @module {type ES6Module} build/shared/links
 */

/** Where a URL starts, and everything a URL may contain. */
const URL_PATTERN = /https?:\/\/[^\s<>"'`]+/g;

/** Punctuation that ends a sentence rather than an address. */
const TRAILING_PUNCTUATION = new Set(['.', ',', ';', ':', '!', '?']);

/** Closers that may belong to the URL or to the markup around it. */
const CLOSERS: Record<string, string> = { ')': '(', ']': '[' };

/**
 * Counts a character in a string.
 * @param {string} text Where to count.
 * @param {string} character What to count.
 * @returns {number} How many there are.
 */
const count = (text: string, character: string) =>
  [...text].filter((one) => one === character).length;

/**
 * Trims what belongs to the sentence rather than to the address.
 *
 * A closing bracket is the hard part, because a URL may legitimately contain
 * one: `…/Function_(mathematics)` is a real address, and in Markdown it is
 * also written `[…](…/Function_(mathematics))` where the last `)` closes the
 * link instead. Counting settles it -- a closer is kept only while something
 * inside the URL opened it.
 * @param {string} url The candidate, as matched.
 * @returns {string} The address without the punctuation around it.
 */
function trim(url: string) {
  let end = url.length;

  for (let again = true; again && end > 0; ) {
    const last = url[end - 1] ?? '';

    again = false;

    if (TRAILING_PUNCTUATION.has(last)) {
      end -= 1;
      again = true;
      continue;
    }

    const opener = CLOSERS[last];

    if (
      opener !== undefined &&
      count(url.slice(0, end), last) > count(url.slice(0, end), opener)
    ) {
      end -= 1;
      again = true;
    }
  }

  return url.slice(0, end);
}

/**
 * Reads every http(s) link out of a piece of prose.
 * @param {string} text What to read.
 * @returns {string[]} The addresses, in the order they appear, with duplicates kept.
 */
export function urlsIn(text: string) {
  return [...text.matchAll(URL_PATTERN)]
    .map((match) => trim(match[0]))
    .filter((url) => /^https?:\/\/\S/.test(url));
}
