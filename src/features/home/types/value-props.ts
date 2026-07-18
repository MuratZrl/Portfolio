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
};

export type ValuePropsProps = {
  items?: readonly ValueItem[];
  heading?: string;
  subheading?: string;
  className?: string;
};
