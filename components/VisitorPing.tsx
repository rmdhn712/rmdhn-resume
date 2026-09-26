"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Fires once per browser session (not on every page navigation) so the
// owner gets a single Telegram notification per visit, not one per page.
export default function VisitorPing() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (sessionStorage.getItem("visitor-notified")) return;
      sessionStorage.setItem("visitor-notified", "1");
    } catch {
      // sessionStorage unavailable (e.g. privacy mode) — just skip silently.
      return;
    }

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer,
      }),
    }).catch(() => {
      // Ignore network errors — this must never affect the visitor's experience.
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
