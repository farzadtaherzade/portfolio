"use client";

import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER_PX = 500;

/**
 * Floating "back to top" button.
 *
 * Appears once the page is scrolled past ~500px and fades/scales out near the
 * top. On mobile it sits above the fixed bottom navigation bar. All window
 * access is inside `useEffect`, keeping it SSR-safe.
 */
export default function BackToTop({ label = "Back to top" }: { label?: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 z-50 flex h-11 w-11 cursor-pointer items-center justify-center border bg-bg-surface transition-[opacity,transform,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none bottom-[calc(6rem_+_env(safe-area-inset-bottom))] md:right-6 md:bottom-6 ${
        visible
          ? "pointer-events-auto translate-y-0 scale-100 border-border-dim opacity-100"
          : "pointer-events-none translate-y-2 scale-95 border-border-dim opacity-0"
      } hover:border-accent-amber hover:shadow-[0_0_16px_rgba(232,168,56,0.25)] focus-visible:border-accent-amber focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-amber`}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        shapeRendering="crispEdges"
        className="text-accent-amber"
      >
        <rect x="9" y="2" width="2" height="2" fill="currentColor" />
        <rect x="7" y="4" width="6" height="2" fill="currentColor" />
        <rect x="5" y="6" width="10" height="2" fill="currentColor" />
        <rect x="9" y="8" width="2" height="10" fill="currentColor" />
      </svg>
    </button>
  );
}
