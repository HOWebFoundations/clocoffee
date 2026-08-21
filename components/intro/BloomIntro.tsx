"use client";
import { useEffect, useState } from "react";

/** 600ms watercolor bloom reveal — first visit only, skippable, gone under
    prefers-reduced-motion (CSS hides it entirely). */
export function BloomIntro({ skipLabel }: { skipLabel: string }) {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("clo-intro-seen")) return;
      localStorage.setItem("clo-intro-seen", "1");
    } catch { /* private mode: show it, harmless */ }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShow(true);
    const t = setTimeout(() => setGone(true), 1300);
    return () => clearTimeout(t);
  }, []);

  if (!show || gone) return null;
  return (
    <div className="bloom-intro" role="presentation" onClick={() => setGone(true)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/media/bloom.png" alt="" />
      <button
        type="button"
        onClick={() => setGone(true)}
        className="absolute bottom-8 text-sm text-espresso/60 underline underline-offset-4"
      >
        {skipLabel}
      </button>
    </div>
  );
}
