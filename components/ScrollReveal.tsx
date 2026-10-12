"use client";

import { useRef, useState } from "react";

/**
 * Progressive-enhancement scroll reveal.
 *
 * Content is visible by default (see `.reveal` in globals.css). The observer
 * only ADDS the entrance animation. If IntersectionObserver is missing, never
 * fires, or the page is inside an iframe that never scrolls internally, the
 * content still shows — it simply does not animate.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const teardown = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const callbackRef = (node: HTMLDivElement | null) => {
    // React calls this with null on unmount and again with the node during
    // StrictMode's double-mount, so always tear down before re-arming.
    teardown();
    if (!node) return;

    // No observer support -> content is already visible; just skip animating.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timerRef.current = setTimeout(() => setVisible(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    observerRef.current = observer;

    // Safety net: if the observer never fires (iframe/preview quirks, hidden
    // containers), still play the animation so nothing can stay unrendered.
    timerRef.current = setTimeout(() => setVisible(true), 1500);
  };

  return (
    <div
      ref={callbackRef}
      className={`reveal ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
