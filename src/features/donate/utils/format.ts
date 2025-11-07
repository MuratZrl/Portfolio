// src/features/donate/utils/format.ts
import type { Account, FiatAccount } from "@/features/donate/types/types";

export function formatIban(raw: string): string {
  const s = raw.replace(/\s+/g, "");
  return s.replace(/(.{4})/g, "$1 ").trim();
}

export function isFiat(a: Account): a is FiatAccount {
  return a.type === "fiat";
}

export function buildInfoText(a: Account): string {
  if (isFiat(a)) {
    const parts: string[] = [
      `Currency: ${a.currency}`,
      `Bank: ${a.bank}`,
      `Account holder: ${a.accountHolder}`,
      `IBAN: ${formatIban(a.iban)}`,
    ];
    if (a.swift) parts.push(`SWIFT/BIC: ${a.swift}`);
    if (a.branch) parts.push(`Branch: ${a.branch}`);
    if (a.note) parts.push(`Note: ${a.note}`);
    return parts.join("\n");
  }
  const cryptoParts: string[] = [
    `Asset: ${a.symbol}`,
    `Network: ${a.network}`,
    `Address: ${a.address}`,
  ];
  if (a.note) cryptoParts.push(`Note: ${a.note}`);
  if (a.uri) cryptoParts.push(`URI: ${a.uri}`);
  return cryptoParts.join("\n");
}

export function tabValue(a: Account): string {
  return isFiat(a) ? a.currency : a.symbol;
}
