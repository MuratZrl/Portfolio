// src/i18n/navigation.ts
import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware drop-ins for next/link and next/navigation. `Link` prefixes
 * /en automatically when the current locale is English and leaves Turkish
 * paths bare, so components keep writing plain hrefs like "/contact".
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
