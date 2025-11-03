// src/config/donation.ts
// Centralized donation config. No "any", no chaos.

export type FiatCurrency = "TRY" | "USD" | "EUR";

export type FiatAccount = {
  type: "fiat";
  currency: FiatCurrency;
  bank: string;
  accountHolder: string;
  /**
   * IBAN can include spaces; UI will normalize.
   * Example format: TR00 0000 0000 0000 0000 0000 00
   */
  iban: string;
  swift?: string;   // SWIFT/BIC for international transfers
  branch?: string;  // Optional branch info or code
  note?: string;    // Suggested transfer note, e.g. "Donation"
  qrSrc?: string;   // Optional IBAN QR image path
};

export type CryptoAccount = {
  type: "crypto";
  symbol: "BTC";     // Keeping it simple per your UI
  network: "Bitcoin";
  address: string;   // bech32 preferred (bc1...)
  uri?: string;      // BIP21, e.g., bitcoin:bc1...?... 
  note?: string;     // “Donation” etc. for wallet memo fields
  qrSrc?: string;    // Optional QR for the address/URI
};

export type Account = FiatAccount | CryptoAccount;

/**
 * Edit the placeholders with your real details.
 * Keep BTC strictly as a voluntary tip, not “payment” text.
 */
export const DONATION_ACCOUNTS: readonly Account[] = [
  // TRY account (example)
  {
    type: "fiat",
    currency: "TRY",
    bank: "Ziraat Bankası",
    accountHolder: "Murat Zorlu",
    iban: "TR00 0000 0000 0000 0000 0000 00",
    swift: "TCZBTR2A",
    branch: "0001 Şube",
    note: "Donation",
    // qrSrc: "/images/qr/iban-try.png",
  },

  // USD account (example)
  {
    type: "fiat",
    currency: "USD",
    bank: "İşbank",
    accountHolder: "Murat Zorlu",
    iban: "TR11 1111 1111 1111 1111 1111 11",
    swift: "ISBKTRIS",
    branch: "0002 Şube",
    note: "Donation",
    // qrSrc: "/images/qr/iban-usd.png",
  },

  // EUR account (example)
  {
    type: "fiat",
    currency: "EUR",
    bank: "Garanti BBVA",
    accountHolder: "Murat Zorlu",
    iban: "TR22 2222 2222 2222 2222 2222 22",
    swift: "TGBATRISXXX",
    branch: "0003 Şube",
    note: "Donation",
    // qrSrc: "/images/qr/iban-eur.png",
  },

  // BTC tip (direct wallet, no payment processor)
  {
    type: "crypto",
    symbol: "BTC",
    network: "Bitcoin",
    address: "bc1qexampleexampleexampleexample000",
    uri: "bitcoin:bc1qexampleexampleexampleexample000?message=Donation",
    note: "Donation",
    // qrSrc: "/images/qr/bitcoin-bc1qexample.png",
  },
] as const;
