// src/app/api/qr/route.ts
import { NextRequest } from "next/server";
import QRCode from "qrcode";

// İstersen edge'te de çalışır
export const runtime = "edge"; // veya hiç yazma

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");
  if (!text) return new Response("Missing text", { status: 400 });

  const svg = await QRCode.toString(text, { type: "svg", margin: 1, width: 256 });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
