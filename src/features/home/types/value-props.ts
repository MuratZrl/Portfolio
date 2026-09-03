// src/features/home/types/value-props.ts

export type Href = "/" | `/${string}`;

export type ValueItem = {
  title: string;
  description: string;
  highlights?: readonly string[];
  tags?: readonly string[];
  /**
   * An instruction the reader can act on to verify the claim themselves, or
   * the name of an example they can open. Replaces the old `stat` slot, which
   * carried self-reported numbers ("A11y score 90+/100", "Bug rate ↓") that
   * nothing could substantiate.
   */
  check?: string;
  /**
   * Set when the check names a DESTINATION rather than an action. A check
   * that points at a URL and renders as plain text is asking the reader to
   * retype it; one that says "press Tab" is an instruction and must stay
   * text, because there is nothing for a link to navigate to.
   */
  checkHref?: string;
  /** Localized "opens in a new tab" note appended to a linked check, sr-only. */
  checkNewTabNote?: string;
};

export type ValuePropsProps = {
  /** Stable anchor id, so old in-page links keep working. */
  id?: string;
  items: readonly ValueItem[];
  heading: string;
  subheading: string;
  /** Printed before a linked check ("Check it:", "Örnek:"). */
  checkPrefix?: string;
  className?: string;
};
