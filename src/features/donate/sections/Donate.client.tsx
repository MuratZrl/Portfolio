// src/features/donate/sections/Donate.client.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Copy,
  Check,
  Banknote,
  ShieldCheck,
  Info,
  ExternalLink,
  Download,
  FileText,
} from "lucide-react";

import { DONATION_ACCOUNTS } from "@/features/donate/data/accounts";
import type { Account, FiatAccount, CryptoAccount } from "@/features/donate/types/types";
import { isFiat, tabValue, formatIban, buildInfoText } from "@/features/donate/utils/format";

/* -------------------------------- Types -------------------------------- */

type DonateProps = {
  className?: string;
};

/* ---------------------------- Root Component --------------------------- */

export default function Donate({ className }: DonateProps): React.JSX.Element {
  const accounts: readonly Account[] = DONATION_ACCOUNTS;
  const firstTab = accounts.length > 0 ? tabValue(accounts[0]) : "TRY";

  return (
    <section className={cn("space-y-8", className)}>
      <MetaHeader />

      <Tabs defaultValue={firstTab} className="w-full">
        <TabsList className="flex w-full flex-wrap justify-start">
          {accounts.map((a) => {
            const value = tabValue(a);
            return (
              <TabsTrigger key={value} value={value} className="gap-2">
                <Banknote className="h-4 w-4" aria-hidden />
                <span>{value}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {accounts.map((a) => {
          const value = tabValue(a);
          return (
            <TabsContent key={value} value={value} className="mt-6">
              {isFiat(a) ? (
                <FiatAccountCard account={a} />
              ) : (
                <CryptoAccountCard account={a} />
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      <NotesCard />
    </section>
  );
}

/* -------------------------------- Parts -------------------------------- */

function MetaHeader(): React.JSX.Element {
  return (
    <header>
      <div className="inline-flex items-center gap-2 rounded-md border bg-background/60 px-2.5 py-1 text-xs backdrop-blur supports-[backdrop-filter]:bg-background/40">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        <span>Verified donation details</span>
      </div>
    </header>
  );
}

/* ------------------------------ FIAT CARD ------------------------------ */

function FiatAccountCard({ account }: { account: FiatAccount }): React.JSX.Element {
  type FiatCopyField = "iban" | "bank" | "accountHolder" | "branch" | "swift";

  const [copiedField, setCopiedField] = React.useState<FiatCopyField | null>(null);
  const [copiedAll, setCopiedAll] = React.useState<boolean>(false);
  const [rawIban, setRawIban] = React.useState<boolean>(false);
  const [statusMsg, setStatusMsg] = React.useState<string>(""); // aria-live

  const spacedIban = formatIban(account.iban);
  const displayIban = rawIban ? account.iban.replace(/\s+/g, "") : spacedIban;

  const infoBlock = React.useMemo(() => buildInfoText(account), [account]);

  function announce(msg: string): void {
    setStatusMsg(msg);
    window.setTimeout(() => setStatusMsg(""), 1400);
  }

  function copy(text: string, which?: FiatCopyField): void {
    void navigator.clipboard.writeText(text).then(() => {
      if (which) {
        setCopiedField(which);
        announce(`${which} copied`);
        window.setTimeout(() => setCopiedField(null), 1200);
      } else {
        setCopiedAll(true);
        announce("All details copied");
        window.setTimeout(() => setCopiedAll(false), 1200);
      }
    });
  }

  function downloadTxt(): void {
    const filename = `donation_${account.currency.toLowerCase()}.txt`;
    const blob = new Blob([infoBlock], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    announce("Details downloaded");
  }

  const branch = account.branch;
  const swift = account.swift;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{account.currency}</Badge>
          <CardTitle className="text-base sm:text-lg">{account.bank}</CardTitle>
          <span className="ml-auto text-[11px] text-muted-foreground">
            Country: <span className="font-medium">TR</span>
          </span>
        </div>

        <div className="text-xs text-muted-foreground">
          Account holder:{" "}
          <span className="font-medium text-foreground">{account.accountHolder}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p role="status" aria-live="polite" className="sr-only">
          {statusMsg}
        </p>

        <div className="rounded-lg border bg-background/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="text-xs text-muted-foreground">IBAN</div>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      className="h-7 px-2 text-xs"
                      onClick={() => setRawIban((v) => !v)}
                      aria-pressed={rawIban}
                      aria-label={rawIban ? "Show spaced IBAN" : "Show raw IBAN"}
                    >
                      {rawIban ? "Spaced" : "Raw"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Toggle spacing</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => copy(displayIban, "iban")}
                aria-label="Copy IBAN"
              >
                {copiedField === "iban" ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copiedField === "iban" ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <Input
            readOnly
            value={displayIban}
            onFocus={(e) => e.currentTarget.select()}
            className="font-mono text-sm"
          />
          <p className="mt-2 text-[11px] text-muted-foreground">
            Tip: some banks require entering IBAN without spaces. Use the toggle if needed.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Bank"
            value={account.bank}
            onCopy={() => copy(account.bank, "bank")}
            copied={copiedField === "bank"}
          />
          <Field
            label="Account holder"
            value={account.accountHolder}
            onCopy={() => copy(account.accountHolder, "accountHolder")}
            copied={copiedField === "accountHolder"}
          />
          {branch ? (
            <Field
              label="Branch"
              value={branch}
              onCopy={() => copy(branch, "branch")}
              copied={copiedField === "branch"}
            />
          ) : null}

          {swift ? (
            <Field
              label="SWIFT / BIC"
              value={swift}
              onCopy={() => copy(swift, "swift")}
              copied={copiedField === "swift"}
            />
          ) : null}
        </div>

        <NoteBuilder baseNote={account.note ?? "Donation"} />

        <Separator />

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => copy(infoBlock)} variant="default">
            {copiedAll ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copiedAll ? "Copied" : "Copy all details"}
          </Button>

          <Button type="button" variant="outline" onClick={downloadTxt}>
            <Download className="mr-2 h-4 w-4" />
            Download .txt
          </Button>

          <Button asChild variant="outline" className="ml-auto">
            <a
              href="https://www.turkiye.gov.tr/banka-hesaplari"
              target="_blank"
              rel="noreferrer"
              aria-label="Open your bank portal"
            >
              Open bank portal
              <ExternalLink className="ml-2 h-4 w-4" aria-hidden />
            </a>
          </Button>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4" aria-hidden />
            Printable summary
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md border bg-background p-3 text-xs">
{infoBlock}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

/* ----------------------------- CRYPTO CARD ----------------------------- */

function CryptoAccountCard({ account }: { account: CryptoAccount }): React.JSX.Element {
  const [copiedAll, setCopiedAll] = React.useState<boolean>(false);
  const [statusMsg, setStatusMsg] = React.useState<string>("");

  // QR (SVG) via /api/qr
  const qrText = account.uri ?? account.address;
  const qrSrc = `/api/qr?text=${encodeURIComponent(qrText)}`;

  const infoBlock = React.useMemo(() => buildInfoText(account), [account]);

  function announce(msg: string): void {
    setStatusMsg(msg);
    window.setTimeout(() => setStatusMsg(""), 1400);
  }

  function copy(text: string): void {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedAll(true);
      announce("Copied");
      window.setTimeout(() => setCopiedAll(false), 1200);
    });
  }

  function downloadTxt(): void {
    const filename = `donation_${account.symbol.toLowerCase()}.txt`;
    const blob = new Blob([infoBlock], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    announce("Details downloaded");
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{account.symbol}</Badge>
          <CardTitle className="text-base sm:text-lg">{account.symbol}</CardTitle>
          <span className="ml-auto text:[11px] text-muted-foreground">
            Network: <span className="font-medium">{account.network}</span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p role="status" aria-live="polite" className="sr-only">
          {statusMsg}
        </p>

        <div className="rounded-lg border bg-background/60 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/40">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div className="text-xs text-muted-foreground">Address</div>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => copy(account.address)}
              aria-label="Copy address"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>

          <Input
            readOnly
            value={account.address}
            onFocus={(e) => e.currentTarget.select()}
            className="font-mono text-sm"
          />

          {account.uri ? (
            <p className="mt-2 text-[11px] text-muted-foreground">
              BIP21:{" "}
              <a href={account.uri} className="underline underline-offset-4">
                {account.uri}
              </a>
            </p>
          ) : null}
        </div>

        {/* QR via API route (SVG) */}
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-sm font-medium">QR</div>
          <div className="rounded-md border bg-muted/30 p-3">
            <div className="mx-auto h-40 w-40">
              <Image
                src={qrSrc}
                alt={`${account.symbol} address QR`}
                width={160}
                height={160}
                className="mx-auto object-contain"
                unoptimized
                />
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Send only on the {account.network} network. Wrong network means funds are lost.
          </p>
        </div>

        <Separator />

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => copy(infoBlock)} variant="default">
            {copiedAll ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copiedAll ? "Copied" : "Copy all details"}
          </Button>

          <Button type="button" variant="outline" onClick={downloadTxt}>
            <Download className="mr-2 h-4 w-4" />
            Download .txt
          </Button>
        </div>

        <div className="rounded-lg border bg-muted/30 p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4" aria-hidden />
            Printable summary
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-md border bg-background p-3 text-xs">
{infoBlock}
          </pre>
        </div>

        <div className="rounded-lg border bg-background/60 p-3 text-xs text-muted-foreground">
          Crypto tips are voluntary support, not a payment for goods or services in Türkiye. Send only {account.symbol} on the {account.network} network.
        </div>
      </CardContent>
    </Card>
  );
}

/* ----------------------------- Reusable bits ---------------------------- */

function Field({
  label,
  value,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
}): React.ReactElement {
  return (
    <div className="rounded-lg border bg-background/60 p-3 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">{label}</div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs"
          aria-label={`Copy ${label}`}
          onClick={onCopy}
        >
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <Input
        readOnly
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        className="font-mono text-sm"
      />
    </div>
  );
}

function NoteBuilder({ baseNote }: { baseNote: string }): React.JSX.Element {
  const [who, setWho] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);

  const suggested = React.useMemo(() => {
    const clean = who.trim();
    if (!clean) return baseNote;
    return `${baseNote}: ${clean}`;
  }, [who, baseNote]);

  function copy(): void {
    void navigator.clipboard.writeText(suggested).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-1 text-sm font-medium">Transfer note helper</div>
      <p className="mb-3 text-xs text-muted-foreground">
        Add an optional note so I can reconcile your transfer quickly.
      </p>
      <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
        <Input
          value={who}
          onChange={(e) => setWho(e.target.value)}
          placeholder="Your name or project (optional)"
          aria-label="Your name or project"
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="button" variant="secondary" onClick={copy}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied" : "Copy note"}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Copies the note only</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-2 rounded-md border bg-background px-3 py-2 text-xs">
        <span className="text-muted-foreground">Suggested:</span>{" "}
        <code className="font-mono">{suggested}</code>
      </div>
    </div>
  );
}

function NotesCard(): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="h-4 w-4" aria-hidden />
          Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>
          International transfers: use the <strong>SWIFT/BIC</strong> if provided. Your bank may charge fees.
        </p>
        <p>
          Add a clear description like <code>Donation</code> or <code>Support</code>. If this is for a specific project,
          mention it in the note for easier bookkeeping.
        </p>
        <p>
          Need an invoice or confirmation? Contact me via the{" "}
          <Link href="/contact" className="underline underline-offset-4">
            contact page
          </Link>
          .
        </p>
      </CardContent>
    </Card>
  );
}
