// src/features/donate/data/accounts.ts
import type { Account } from "@/features/donate/types/types";

export const DONATION_ACCOUNTS = [
  {
    type: "fiat",
    currency: "TRY",
    bank: "Ziraat Bankası",
    accountHolder: "Murat Zorlu",
    // İster boşluksuz tut, ister aralarda boşluk kullan; komponent zaten normalize ediyor.
    iban: "TR7100100175958081385001",
    swift: "TCZBTR2A",
    note: "Donation"
    // TRY için QR KAPALI. (/donate komponentinde koşulla gizleniyor)
  },
  {
    type: "crypto",
    symbol: "BTC",
    network: "Bitcoin",
    address:
      "bc1q7f8adux65vqvgjf5g99r4dqwe4w2lsry824j4gdfdh5eh6805tvsgrghvx",
    // Basit bir BIP21 URI; amount eklemek istemiyorsan sadece label bırak
    uri:
      "bitcoin:bc1q7f8adux65vqvgjf5g99r4dqwe4w2lsry824j4gdfdh5eh6805tvsgrghvx?label=Donation",
    note: "Send only BTC on the Bitcoin network"
  }
] as const satisfies readonly Account[];
