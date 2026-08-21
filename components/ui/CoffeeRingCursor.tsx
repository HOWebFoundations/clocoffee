"use client";
import { useEffect, useRef } from "react";

/** Coffee-ring cursor over tappables — desktop fine pointers only. */
export function CoffeeRingCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0, x = 0, y = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      const t = e.target as HTMLElement;
      el.classList.toggle("is-active", !!t.closest("a,button,[role=button],input,select,textarea,label"));
      if (!raf) raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x}px, ${y}px)`;
        raf = 0;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} className="coffee-ring" aria-hidden="true" />;
}
