"use client";

import { useEffect, useRef } from "react";

/**
 * Page-level scroll progress indicator.
 *
 * A 3px bar pinned to the very top of the viewport. The amber fill is driven
 * with `transform: scaleX()` (never `width`) so it stays on the compositor.
 * All DOM/window access happens inside `useEffect`, so this is SSR-safe.
 */
export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;

    const reduceMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Under reduced motion, snap instantly; otherwise allow a tiny smoothing.
    fill.style.transition = reduceMotion ? "none" : "transform 80ms linear";

    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      const clamped = Math.min(1, Math.max(0, progress));
      fill.style.transform = `scaleX(${clamped})`;
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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] w-full bg-bg-surface-light/40"
    >
      <div
        ref={fillRef}
        className="h-full w-full origin-left bg-accent-amber"
        style={{
          transform: "scaleX(0)",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(232, 168, 56, 0.55)",
        }}
      />
    </div>
  );
}
