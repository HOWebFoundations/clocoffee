import { WORLD, type World } from "./glass/types";

/**
 * Renders the finished drink as a 1080×1920 Instagram story card on a canvas:
 * the chosen world as backdrop, the live SVG glass serialized and drawn at
 * size, the drink's name in the site's serif, the wordmark, a handle line.
 * Returns a PNG blob; the caller shares it (Web Share → Instagram on phones)
 * or downloads it.
 */
export async function renderStoryCard(opts: {
  svg: SVGSVGElement; name: string; world: World; soon: string; tag: string; handle: string; bloomUrl: string;
}): Promise<Blob> {
  const W = 1080, H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no canvas");
  const w = WORLD[opts.world];
  const ink = w.text === "light" ? "#EEE0C6" : "#392618";

  // backdrop: the world, top-lit
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, w.bg2); g.addColorStop(1, w.bg);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 900, 80, W / 2, 900, 700);
  glow.addColorStop(0, "rgba(255,255,255,0.16)"); glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);

  // fonts: the serif family next/font registered on :root
  const root = getComputedStyle(document.documentElement);
  const serif = root.getPropertyValue("--font-display").trim() || "Georgia";
  const sans = root.getPropertyValue("--font-latin").trim() || "sans-serif";
  try { await document.fonts.load(`400 64px ${serif}`); await document.fonts.load(`700 56px ${sans}`); } catch { /* fall back */ }

  // the glass: serialize the live SVG and draw it at ~1000px tall
  const clone = opts.svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "740"); clone.setAttribute("height", "1036");
  const xml = new XMLSerializer().serializeToString(clone);
  const url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(xml);
  await drawImage(ctx, url, (W - 740) / 2, 330, 740, 1036);

  // soon line, top
  ctx.fillStyle = ink; ctx.globalAlpha = 0.75; ctx.textAlign = "center";
  ctx.font = `700 30px ${sans}`;
  ctx.fillText(opts.soon.toUpperCase(), W / 2, 200);
  ctx.globalAlpha = 1;

  // drink name, serif, wrapped
  ctx.font = `400 68px ${serif}`;
  const lines = wrap(ctx, opts.name, 900);
  let y = 1440;
  for (const line of lines) { ctx.fillText(line, W / 2, y); y += 82; }

  // wordmark: cl + bloom + coffee
  ctx.font = `700 60px ${sans}`;
  const left = ctx.measureText("cl").width, right = ctx.measureText("coffee").width, bloom = 62, gap = 6;
  const total = left + gap + bloom + gap + right;
  let x = (W - total) / 2;
  const yWm = 1720;
  ctx.textAlign = "left";
  ctx.fillText("cl", x, yWm); x += left + gap;
  await drawImage(ctx, opts.bloomUrl, x, yWm - 52, bloom, bloom); x += bloom + gap;
  ctx.fillText("coffee", x, yWm);

  // handle + tag
  ctx.textAlign = "center"; ctx.globalAlpha = 0.7;
  ctx.font = `700 28px ${sans}`;
  ctx.fillText(`${opts.handle}  ·  ${opts.tag}`, W / 2, 1800);
  ctx.globalAlpha = 1;

  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/png"));
}

/** Share the card via the native sheet (Instagram on phones) or download it. */
export async function shareOrDownload(blob: Blob, filename: string, title: string): Promise<"shared" | "downloaded"> {
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try { await nav.share({ files: [file], title }); return "shared"; } catch { /* user dismissed; fall through */ }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  return "downloaded";
}

function drawImage(ctx: CanvasRenderingContext2D, src: string, x: number, y: number, w: number, h: number) {
  return new Promise<void>((res, rej) => {
    const img = new Image();
    img.onload = () => { ctx.drawImage(img, x, y, w, h); res(); };
    img.onerror = () => rej(new Error(`image failed: ${src.slice(0, 40)}`));
    img.src = src;
  });
}

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const words = text.split(" "), lines: string[] = [];
  let cur = "";
  for (const wd of words) {
    const t = cur ? `${cur} ${wd}` : wd;
    if (ctx.measureText(t).width > max && cur) { lines.push(cur); cur = wd; } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}
