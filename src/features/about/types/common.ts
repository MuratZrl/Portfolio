// src/features/about/types/common.ts

/** Zero-padded month string. "01".."12" */
export type MonthStr =
  | "01" | "02" | "03" | "04" | "05" | "06"
  | "07" | "08" | "09" | "10" | "11" | "12";

/** Period in YYYY-MM format. If `end` is omitted, it's ongoing. */
export type Period = {
  start: `${number}-${MonthStr}`;
  end?: `${number}-${MonthStr}`;
};

/** Simple external link representation. */
export type ExtLink = { label: string; href: string };

/** Internal href helper for your app. */
export type Href = "/" | `/${string}`;
