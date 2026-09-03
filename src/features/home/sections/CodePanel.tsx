// src/features/home/sections/CodePanel.tsx

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Verbatim from PulseChat: apps/api/src/adapters/redis-io.adapter.ts,
 * the `connectToRedis` method. Not paraphrased, not reconstructed — this is
 * the code that ships, including its own comment about cross-replica
 * delivery, which is exactly what the caption claims.
 *
 * RE-WRAPPED ONLY. Three lines exceeded the panel width and pushed a
 * horizontal scrollbar into the layout, so the comment is split across three
 * lines and Promise.all takes one ping per line. Whitespace and line breaks
 * are the only difference — every token, identifier and comment word is
 * unchanged, including the absent trailing comma after the second ping.
 * Longest line is now 60 chars.
 */
const SNIPPET = `async connectToRedis(): Promise<void> {
  const url = process.env.REDIS_URL;
  const opts: RedisOptions = { maxRetriesPerRequest: null };

  this.pubClient = url
    ? new Redis(url, opts)
    : new Redis({
        host: process.env.REDIS_HOST ?? 'localhost',
        port: Number(process.env.REDIS_PORT ?? 6379),
        ...opts,
      });
  this.subClient = this.pubClient.duplicate();

  // ioredis auto-connects lazily, but ping early so a
  // misconfigured URL surfaces at boot instead of silently
  // breaking cross-replica delivery.
  await Promise.all([
    this.pubClient.ping(),
    this.subClient.ping()
  ]);
}`;

type Tok = "plain" | "comment" | "keyword" | "string" | "fn" | "number";

const KEYWORDS = new Set([
  "async", "await", "const", "new", "return", "this", "null", "void",
  "Promise", "Number", "process",
]);

/**
 * Minimal tokenizer, run at build time inside a server component. Shiki would
 * be the conventional choice but it is a large dependency for one static
 * snippet, and hand-owning the token set means every colour is one I have
 * verified at >=4.5:1 on the panel surface in both themes, rather than
 * inheriting a theme and auditing it afterwards.
 */
function tokenize(line: string): Array<[string, Tok]> {
  const out: Array<[string, Tok]> = [];
  const re =
    /(\/\/[^\n]*)|('[^']*'|"[^"]*"|`[^`]*`)|(\b\d+\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|(\s+)|([^\w\s])/g;

  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const [raw, comment, str, num, fn, word, ws, punct] = m;
    if (comment) out.push([raw, "comment"]);
    else if (str) out.push([raw, "string"]);
    else if (num) out.push([raw, "number"]);
    else if (fn) out.push([raw, "fn"]);
    else if (word) out.push([raw, KEYWORDS.has(raw) ? "keyword" : "plain"]);
    else if (ws || punct) out.push([raw, "plain"]);
  }
  return out;
}

const COLOR: Record<Tok, string> = {
  plain: "var(--code-plain)",
  comment: "var(--code-comment)",
  keyword: "var(--code-keyword)",
  string: "var(--code-string)",
  fn: "var(--code-fn)",
  number: "var(--code-number)",
};

export default function CodePanel({ className }: { className?: string }): React.JSX.Element {
  const lines = SNIPPET.split("\n");

  return (
    <figure className={cn("flex min-w-0 flex-col", className)}>
      <div className="min-w-0 overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--edge-soft)] bg-[var(--surface)] p-4">
        <pre className="text-[length:var(--text-body-xs)] leading-[1.75]">
          <code className="font-mono">
            {lines.map((line, i) => (
              <span key={i} className="block whitespace-pre">
                {tokenize(line).map(([text, tok], j) => (
                  <span key={j} style={{ color: COLOR[tok] }}>
                    {text}
                  </span>
                ))}
                {line === "" ? " " : null}
              </span>
            ))}
          </code>
        </pre>
      </div>

      <figcaption className="mt-3 text-[length:var(--text-body-xs)] text-[var(--text-muted)]">
        PulseChat · Socket.io scaling across replicas
      </figcaption>
    </figure>
  );
}
