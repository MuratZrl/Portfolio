// src/features/donate/types.ts
export type Currency = "TRY" | "USD" | "EUR";
export type CryptoSymbol = "BTC" | "ETH"; // genişletilebilir

export type FiatAccount = {
  type: "fiat";
  currency: Currency;
  bank: string;
  accountHolder: string;
  iban: string;
  swift?: string;
  branch?: string;
  note?: string;
  qrSrc?: string; // /public altında veya remote
};

export type CryptoAccount = {
  type: "crypto";
  symbol: CryptoSymbol;
  network: string;  // "Bitcoin", "Ethereum", vs.
  address: string;
  uri?: string;     // BIP21 vb.
  note?: string;
  qrSrc?: string;
};

export type Account = FiatAccount | CryptoAccount;
