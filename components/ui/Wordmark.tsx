/* The lockup: lowercase, bloom replacing the first "o".
   Optical centre sits left of the bounding box (brand.md §5) — callers
   should centre it visually, not geometrically. */
export function Wordmark({ className = "", bloomSize = "1em" }: { className?: string; bloomSize?: string }) {
  return (
    <span dir="ltr" className={`inline-flex items-baseline font-bold tracking-wide lowercase select-none ${className}`} translate="no">
      <span>cl</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/bloom.png"
        alt="o"
        style={{ width: bloomSize, height: bloomSize, transform: "translateY(0.12em)" }}
        className="mx-[0.02em] inline-block object-contain"
      />
      <span>coffee</span>
    </span>
  );
}
