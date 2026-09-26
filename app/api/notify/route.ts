import { NextRequest, NextResponse } from "next/server";

// Reads the bot token & chat id from environment variables (set in Vercel
// dashboard → Settings → Environment Variables). If they are missing, the
// route quietly does nothing so a misconfiguration never breaks the site
// for visitors.
export async function POST(req: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, reason: "not_configured" });
  }

  let body: { page?: string; referrer?: string } = {};
  try {
    body = await req.json();
  } catch {
    // ignore malformed/empty body
  }

  const page = body.page || "/";
  const referrer = body.referrer && body.referrer !== "" ? body.referrer : "direct";

  // Vercel automatically attaches these geo headers at the edge — no extra
  // API call or library needed. They may be empty on local dev.
  const country = req.headers.get("x-vercel-ip-country") || "Unknown";
  const cityHeader = req.headers.get("x-vercel-ip-city");
  const city = cityHeader ? decodeURIComponent(cityHeader) : "";
  const location = city ? `${city}, ${country}` : country;

  const userAgent = req.headers.get("user-agent") || "Unknown device";
  const time = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Jakarta",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const text =
    `🔔 New visitor on your resume site!\n` +
    `📄 Page: ${page}\n` +
    `📍 Location: ${location}\n` +
    `🔗 Referrer: ${referrer}\n` +
    `🕐 Time: ${time} WIB\n` +
    `🖥️ Device: ${userAgent}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    // A failed notification should never surface as an error to the visitor.
  }

  return NextResponse.json({ ok: true });
}
