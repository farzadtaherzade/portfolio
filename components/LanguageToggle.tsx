"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle({
  lang,
  setLang,
}: {
  lang: "en" | "fa";
  setLang: (lang: "en" | "fa") => void;
}) {
  return (
    <div className="flex items-center gap-2 pixel-card px-3 py-1.5 cursor-pointer">
      <button
        onClick={() => setLang("en")}
        className={`font-mono text-sm transition-colors duration-200 ${
          lang === "en" ? "text-accent-amber" : "text-text-tertiary hover:text-text-secondary"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-text-tertiary font-mono text-sm">|</span>
      <button
        onClick={() => setLang("fa")}
        className={`font-mono text-sm transition-colors duration-200 ${
          lang === "fa" ? "text-accent-amber" : "text-text-tertiary hover:text-text-secondary"
        }`}
        aria-label="Switch to Persian"
        dir="rtl"
      >
        فا
      </button>
    </div>
  );
}
