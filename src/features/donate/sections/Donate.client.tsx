// src/features/donate/sections/Donate.client.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Copy,
  Check,
  Banknote,
  ShieldCheck,
  Info,
  Download,
  FileText,
  Bitcoin,
  AlertTriangle,
} from "lucide-react";

import { DONATION_ACCOUNTS } from "@/features/donate/data/accounts";
import type { Account, FiatAccount, CryptoAccount } from "@/features/donate/types/types";
import { isFiat, tabValue, formatIban, buildInfoText } from "@/features/donate/utils/format";

/* -------------------------------- Types -------------------------------- */

type DonateProps = { className?: string };

/* ─────────────────────────── Copy‑button helper ─────────────────────────── */

function CopyBtn({
  text,
  label,
  copied,
  onCopy,
  size = "sm",
}: {
  text?: string;
  label: string;
  copied: boolean;
  onCopy: () => void;
  size?: "sm" | "md";
}): React.JSX.Element {
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={onCopy}
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-lg font-medium transition-colors",
        copied
          ? "bg-green-600/10 text-green-600 dark:text-green-400"
          : "bg-muted text-muted-foreground hover:text-foreground",
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-xs",
      )}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {text ?? (copied ? "Copied" : "Copy")}
    </button>
  );
}

/* ─────────────────────────── Readonly field ──────────────────────────── */

function ReadonlyField({
  label,
  value,
  mono = false,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  mono?: boolean;
  copied: boolean;
  onCopy: () => void;
}): React.JSX.Element {
  return (
    <div className="rounded-xl border border-border/50 bg-background/60 p-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <CopyBtn label={label} copied={copied} onCopy={onCopy} />
      </div>
      <input
        readOnly
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        className={cn(
          "w-full rounded-lg border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none",
          "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
          mono && "font-mono",
        )}
      />
    </div>
  );
}

/* ========================== Root Component ============================== */

export default function Donate({ className }: DonateProps): React.JSX.Element {
  const accounts: readonly Account[] = DONATION_ACCOUNTS;
  const [activeTab, setActiveTab] = React.useState(
    accounts.length > 0 ? tabValue(accounts[0]) : "TRY",
  );

  return (
    <section className={cn("space-y-6", className)}>
      {/* Verified badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-green-600/20 bg-green-600/10 px-3 py-1.5 text-xs font-medium text-green-700 dark:text-green-300">
        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
        Verified donation details
      </div>

      {/* Tab bar */}
      <div className="flex gap-2">
        {accounts.map((a) => {
          const value = tabValue(a);
          const active = activeTab === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                  : "border border-border/50 bg-background/60 text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {isFiat(a) ? (
                <Banknote className="h-4 w-4" aria-hidden />
              ) : (
                <Bitcoin className="h-4 w-4" aria-hidden />
              )}
              {value}
            </button>
          );
        })}
      </div>

      {/* Active account card */}
      {accounts.map((a) => {
        const value = tabValue(a);
        if (value !== activeTab) return null;
        return isFiat(a) ? (
          <FiatAccountCard key={value} account={a} />
        ) : (
          <CryptoAccountCard key={value} account={a} />
        );
      })}

      {/* Notes */}
      <NotesCard />
    </section>
  );
}

/* ============================== FIAT CARD ================================ */

function FiatAccountCard({ account }: { account: FiatAccount }): React.JSX.Element {
  type FiatCopyField = "iban" | "bank" | "accountHolder" | "branch" | "swift" | "all";

  const [copiedField, setCopiedField] = React.useState<FiatCopyField | null>(null);
  const [rawIban, setRawIban] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState("");

  const spacedIban = formatIban(account.iban);
  const displayIban = rawIban ? account.iban.replace(/\s+/g, "") : spacedIban;
  const infoBlock = React.useMemo(() => buildInfoText(account), [account]);

  function announce(msg: string): void {
    setStatusMsg(msg);
    window.setTimeout(() => setStatusMsg(""), 1400);
  }

  function copy(text: string, which: FiatCopyField): void {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedField(which);
      announce(`${which} copied`);
      window.setTimeout(() => setCopiedField(null), 1200);
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

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}
    >
      <p role="status" aria-live="polite" className="sr-only">
        {statusMsg}
      </p>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Banknote className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{account.bank}</h3>
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
              {account.currency}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Account holder: <span className="font-medium text-foreground">{account.accountHolder}</span>
          </p>
        </div>
        <span className="text-[11px] text-muted-foreground">
          Country: <span className="font-medium">TR</span>
        </span>
      </div>

      {/* IBAN */}
      <div className="mb-5 rounded-xl border border-border/50 bg-background/60 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">IBAN</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRawIban((v) => !v)}
              aria-pressed={rawIban}
              aria-label={rawIban ? "Show spaced IBAN" : "Show raw IBAN"}
              className="rounded-lg bg-muted px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {rawIban ? "Spaced" : "Raw"}
            </button>
            <CopyBtn
              label="IBAN"
              copied={copiedField === "iban"}
              onCopy={() => copy(displayIban, "iban")}
            />
          </div>
        </div>
        <input
          readOnly
          value={displayIban}
          onFocus={(e) => e.currentTarget.select()}
          className={cn(
            "w-full rounded-lg border border-border/50 bg-background/60 px-3 py-2 font-mono text-sm outline-none",
            "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
          )}
        />
        <p className="mt-2 text-[11px] text-muted-foreground">
          Tip: some banks require IBAN without spaces. Use the toggle above.
        </p>
      </div>

      {/* Detail fields */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <ReadonlyField
          label="Bank"
          value={account.bank}
          copied={copiedField === "bank"}
          onCopy={() => copy(account.bank, "bank")}
        />
        <ReadonlyField
          label="Account holder"
          value={account.accountHolder}
          copied={copiedField === "accountHolder"}
          onCopy={() => copy(account.accountHolder, "accountHolder")}
        />
        {account.branch && (
          <ReadonlyField
            label="Branch"
            value={account.branch}
            copied={copiedField === "branch"}
            onCopy={() => copy(account.branch!, "branch")}
          />
        )}
        {account.swift && (
          <ReadonlyField
            label="SWIFT / BIC"
            value={account.swift}
            mono
            copied={copiedField === "swift"}
            onCopy={() => copy(account.swift!, "swift")}
          />
        )}
      </div>

      {/* Transfer note helper */}
      <NoteBuilder baseNote={account.note ?? "Donation"} />

      {/* Divider */}
      <div className="my-5 h-px bg-border/50" />

      {/* Actions */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => copy(infoBlock, "all")}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {copiedField === "all" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copiedField === "all" ? "Copied" : "Copy all details"}
        </button>

        <button
          type="button"
          onClick={downloadTxt}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
            "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          <Download className="h-3.5 w-3.5" />
          Download .txt
        </button>

      </div>

      {/* Printable summary */}
      <div className="rounded-xl border border-border/50 bg-background/60 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-muted-foreground" aria-hidden />
          Printable summary
        </div>
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
          {infoBlock}
        </pre>
      </div>
    </div>
  );
}

/* ============================= CRYPTO CARD =============================== */

function CryptoAccountCard({ account }: { account: CryptoAccount }): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [statusMsg, setStatusMsg] = React.useState("");

  const qrText = account.uri ?? account.address;
  const qrSrc = `/api/qr?text=${encodeURIComponent(qrText)}`;
  const infoBlock = React.useMemo(() => buildInfoText(account), [account]);

  function announce(msg: string): void {
    setStatusMsg(msg);
    window.setTimeout(() => setStatusMsg(""), 1400);
  }

  function copyAddr(): void {
    void navigator.clipboard.writeText(account.address).then(() => {
      setCopied(true);
      announce("Address copied");
      window.setTimeout(() => setCopied(false), 1200);
    });
  }

  function copyAll(): void {
    void navigator.clipboard.writeText(infoBlock).then(() => {
      setCopiedAll(true);
      announce("All details copied");
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
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}
    >
      <p role="status" aria-live="polite" className="sr-only">
        {statusMsg}
      </p>

      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Bitcoin className="h-4 w-4" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">{account.symbol}</h3>
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              {account.network}
            </span>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="mb-5 rounded-xl border border-border/50 bg-background/60 p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-muted-foreground">Address</span>
          <CopyBtn label="address" copied={copied} onCopy={copyAddr} />
        </div>
        <input
          readOnly
          value={account.address}
          onFocus={(e) => e.currentTarget.select()}
          className={cn(
            "w-full rounded-lg border border-border/50 bg-background/60 px-3 py-2 font-mono text-xs outline-none",
            "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
          )}
        />
        {account.uri && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            BIP21:{" "}
            <a href={account.uri} className="text-primary hover:underline">
              {account.uri}
            </a>
          </p>
        )}
      </div>

      {/* QR + Warning side by side on desktop */}
      <div className="mb-5 grid gap-4 sm:grid-cols-[auto_1fr]">
        {/* QR code */}
        <div className="rounded-xl border border-border/50 bg-background/60 p-4">
          <div className="mb-2 text-xs font-medium text-muted-foreground">QR Code</div>
          <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-lg bg-white p-2">
            <Image
              src={qrSrc}
              alt={`${account.symbol} address QR`}
              width={160}
              height={160}
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Network warning */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 rounded-xl border border-amber-600/20 bg-amber-600/10 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden />
            <div className="text-sm">
              <div className="mb-1 font-medium text-amber-700 dark:text-amber-300">Network warning</div>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                Send only <strong>{account.symbol}</strong> on the <strong>{account.network}</strong> network. Wrong network means funds are permanently lost.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-background/60 p-4 text-xs text-muted-foreground">
            Crypto tips are voluntary support, not a payment for goods or services in Türkiye.
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-border/50" />

      {/* Actions */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copyAll}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
          )}
        >
          {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copiedAll ? "Copied" : "Copy all details"}
        </button>

        <button
          type="button"
          onClick={downloadTxt}
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors",
            "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
          )}
        >
          <Download className="h-3.5 w-3.5" />
          Download .txt
        </button>
      </div>

      {/* Printable summary */}
      <div className="rounded-xl border border-border/50 bg-background/60 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-muted-foreground" aria-hidden />
          Printable summary
        </div>
        <pre className="max-h-48 overflow-auto whitespace-pre-wrap rounded-lg border border-border/50 bg-muted/30 p-3 font-mono text-xs text-muted-foreground">
          {infoBlock}
        </pre>
      </div>
    </div>
  );
}

/* ============================= Note Builder =============================== */

function NoteBuilder({ baseNote }: { baseNote: string }): React.JSX.Element {
  const [who, setWho] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const suggested = React.useMemo(() => {
    const clean = who.trim();
    return clean ? `${baseNote}: ${clean}` : baseNote;
  }, [who, baseNote]);

  function copyNote(): void {
    void navigator.clipboard.writeText(suggested).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <div className="rounded-xl border border-border/50 bg-background/60 p-4">
      <div className="mb-1 text-sm font-medium">Transfer note helper</div>
      <p className="mb-3 text-xs text-muted-foreground">
        Add an optional note so I can reconcile your transfer quickly.
      </p>
      <div className="flex gap-2">
        <input
          value={who}
          onChange={(e) => setWho(e.target.value)}
          placeholder="Your name or project (optional)"
          aria-label="Your name or project"
          className={cn(
            "flex-1 rounded-lg border border-border/50 bg-background/60 px-3 py-2 text-sm outline-none",
            "placeholder:text-muted-foreground/50",
            "focus:border-primary/40 focus:ring-2 focus:ring-primary/20",
          )}
        />
        <CopyBtn text={copied ? "Copied" : "Copy note"} label="note" copied={copied} onCopy={copyNote} size="md" />
      </div>
      <div className="mt-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-2 text-xs">
        <span className="text-muted-foreground">Suggested:</span>{" "}
        <code className="font-mono text-foreground">{suggested}</code>
      </div>
    </div>
  );
}

/* ============================== Notes Card ================================ */

function NotesCard(): React.JSX.Element {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6",
        "border-border/50 bg-card/80 backdrop-blur-sm",
      )}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Info className="h-4 w-4" aria-hidden />
        </div>
        <h3 className="text-base font-semibold">Notes</h3>
      </div>

      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          International transfers: use the <strong className="text-foreground">SWIFT/BIC</strong> if provided. Your bank may charge fees.
        </p>
        <p>
          Add a clear description like <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Donation</code> or{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">Support</code>. Mention the project name for easier bookkeeping.
        </p>
        <p>
          Need an invoice or confirmation?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact me
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
