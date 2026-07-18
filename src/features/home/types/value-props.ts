// src/features/home/types/value-props.ts

export type Href = "/" | `/${string}`;

export type ValueItem = {
  title: string;
  description: string;
  highlights?: readonly string[];
  tags?: readonly string[];
  /**
   * An instruction the reader can act on to verify the claim themselves.
   * Replaces the old `stat` slot, which carried self-reported numbers
   * ("A11y score 90+/100", "Bug rate ↓") that nothing could substantiate.
   */
  check: string;
  /**
   * Set when the check names a DESTINATION rather than an action. A check
   * that points at a URL and renders as plain text is asking the reader to
   * retype it; one that says "press Tab" is an instruction and must stay
   * text, because there is nothing for a link to navigate to.
   */
  checkHref?: string;
};

export type ValuePropsProps = {
  items?: readonly ValueItem[];
  heading?: string;
  subheading?: string;
  className?: string;
};
