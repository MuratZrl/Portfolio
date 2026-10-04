// src/lib/number-words.ts

/**
 * Small cardinals as words, for prose that counts something read out of data.
 * The copy on this site spells its counts out ("All nine projects", "Four
 * built for paying clients"), so a number derived from PROJECTS has to arrive
 * as a word or the sentence changes voice.
 *
 * The table stops at twelve on purpose. Past that the digits read better in a
 * sentence anyway, and the fallback means the day a thirteenth project lands
 * the copy says "13" rather than "undefined".
 */
const CARDINALS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
] as const;

/**
 * `capitalize` is for the word at the head of a sentence. It is an option
 * rather than a second export because the alternative is every caller doing
 * its own slice-and-uppercase at the call site.
 */
export function numberWord(n: number, opts?: { capitalize?: boolean }): string {
  const word =
    Number.isInteger(n) && n >= 0 && n < CARDINALS.length ? CARDINALS[n] : String(n);
  return opts?.capitalize ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}
