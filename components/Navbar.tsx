"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";

type NavItem = { id: string; label: string };

/** Simple rect-based pixel icons on a 20x20 grid: [x, y, w, h]. */
const ICONS: Record<string, [number, number, number, number][]> = {
  about: [
    [8, 2, 4, 4], // head
    [6, 7, 8, 8], // body
    [4, 8, 2, 5], // left arm
    [14, 8, 2, 5], // right arm
  ],
  projects: [
    [2, 4, 7, 3], // folder tab
    [2, 7, 16, 9], // folder body
    [4, 9, 12, 2], // slot
  ],
  skills: [
    [9, 2, 4, 6], // bolt top
    [7, 8, 7, 3], // bolt middle
    [6, 11, 5, 7], // bolt bottom
  ],
  activity: [
    [3, 12, 3, 6], // bar 1
    [8, 7, 3, 11], // bar 2
    [13, 3, 3, 15], // bar 3
  ],
  contact: [
    [2, 3, 16, 2], // envelope top
    [2, 15, 16, 2], // envelope bottom
    [2, 3, 2, 14], // envelope left
    [16, 3, 2, 14], // envelope right
    [4, 5, 2, 2], // flap step
    [6, 7, 2, 2], // flap step
    [8, 9, 4, 2], // flap center
    [12, 7, 2, 2], // flap step
    [14, 5, 2, 2], // flap step
  ],
};

function PixelIcon({ id }: { id: string }) {
  const rects = ICONS[id] ?? ICONS.about;
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="block shrink-0"
    >
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="currentColor" />
      ))}
    </svg>
  );
}

export default function Navbar({
  items,
  lang,
}: {
  items: NavItem[];
  lang: "en" | "fa";
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const [entered, setEntered] = useState(false);
  const [compact, setCompact] = useState(false);
  const [reduced, setReduced] = useState(false);

  const isRtl = lang === "fa";

  /* ----- prefers-reduced-motion ----- */
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  /* ----- entrance animation (fade + slide down ~12px) ----- */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ----- scroll spy (IntersectionObserver + scroll fallback) ----- */
  useEffect(() => {
    if (typeof document === "undefined") return;

    const els = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    if (els.length === 0) return;

    // Last section whose top has passed the 120px threshold.
    const recompute = () => {
      // At the very bottom of the page the final section may not be able to
      // scroll its top past the threshold (not enough content below it), so
      // treat "reached the end" as "last section is active".
      const doc = document.documentElement;
      const atBottom =
        window.scrollY >= doc.scrollHeight - window.innerHeight - 2;
      if (atBottom) {
        setActiveId(els[els.length - 1].id);
        return;
      }

      const line = 120;
      let next = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top - line <= 0) next = el.id;
      }
      setActiveId(next);
    };

    // Scroll is the ground truth: IntersectionObserver alone can miss the
    // final resting position during a smooth scroll, which would leave the
    // wrong link highlighted. Recompute on scroll (rAF-throttled).
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        recompute();
      });
    };

    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    if (typeof IntersectionObserver === "undefined") {
      return () => {
        if (frame) window.cancelAnimationFrame(frame);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      };
    }

    const observer = new IntersectionObserver(() => recompute(), {
      rootMargin: "-72px 0px -50% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    els.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  /* ----- compact the bar once the user scrolls (stays visible) ----- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) {
      setCompact(false);
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCompact(window.scrollY > 120);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  /* ----- click: smooth scroll + hash update without a hard jump ----- */
  const handleClick = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setActiveId(id);

      const el = typeof document !== "undefined" ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }

      if (typeof window !== "undefined") {
        if (window.history && typeof window.history.pushState === "function") {
          window.history.pushState(null, "", `#${id}`);
        } else {
          window.location.hash = id;
        }
      }
    },
    [reduced]
  );

  /* ----- shared inline styles (transform/opacity only) ----- */
  const entrance = (offset: number): CSSProperties => ({
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : `translateY(${offset}px)`,
    transition: reduced
      ? "none"
      : "opacity 400ms ease-out, transform 400ms ease-out, gap 250ms ease-out, padding 250ms ease-out",
  });

  const desktopLabel = isRtl ? "ناوبری اصلی" : "Primary navigation";
  const mobileLabel = isRtl ? "ناوبری موبایل" : "Mobile navigation";

  return (
    <>
      {/* ---------- Desktop: centered floating pill ---------- */}
      <nav
        aria-label={desktopLabel}
        dir={isRtl ? "rtl" : "ltr"}
        className="hidden md:flex fixed top-4 left-0 right-0 z-40 justify-center px-4"
      >
        <div
          className={`flex items-center rounded-lg border border-border-mid backdrop-blur-md transition-colors duration-200 ${
            compact ? "gap-0.5 px-4 py-2" : "gap-1 px-6 py-3"
          }`}
          style={{
            background: compact ? "rgba(21, 18, 39, 0.95)" : "rgba(21, 18, 39, 0.82)",
            boxShadow: compact
              ? "0 4px 16px rgba(0, 0, 0, 0.5)"
              : "0 8px 30px rgba(0, 0, 0, 0.35)",
            ...entrance(-12),
          }}
        >
          {items.map(({ id, label }) => {
            const active = id === activeId;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={active ? "true" : undefined}
                className={`font-mono leading-none px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber ${
                  compact ? "text-[15px]" : "text-[17px]"
                } ${
                  active
                    ? "text-accent-amber"
                    : "text-text-secondary hover:text-accent-amber hover:bg-accent-amber/10"
                }`}
                style={
                  active
                    ? {
                        background: "rgba(232, 168, 56, 0.12)",
                        boxShadow: "inset 0 -2px 0 0 rgba(232, 168, 56, 0.7)",
                      }
                    : undefined
                }
              >
                {label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* ---------- Mobile: fixed bottom bar ---------- */}
      <nav
        aria-label={mobileLabel}
        dir={isRtl ? "rtl" : "ltr"}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40"
      >
        <div
          className={`flex items-stretch border-t border-border-dim backdrop-blur-md transition-[padding] duration-300 ease-out ${
            compact ? "py-1" : "py-2"
          }`}
          style={{
            background: "rgba(13, 11, 26, 0.92)",
            paddingBottom: `calc(${compact ? "0.25rem" : "0.5rem"} + env(safe-area-inset-bottom, 0px))`,
            ...entrance(-12),
          }}
        >
          {items.map(({ id, label }) => {
            const active = id === activeId;
            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => handleClick(e, id)}
                aria-current={active ? "true" : undefined}
                className={`flex flex-1 min-w-0 flex-col items-center justify-center gap-1 px-1 min-h-[48px] text-center font-pixel text-[8px] leading-tight cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber ${
                  active
                    ? "text-accent-amber"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
              >
                <PixelIcon id={id} />
                <span className="w-full overflow-hidden break-anywhere">
                  {label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
