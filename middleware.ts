import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar", "fr"];
const defaultLocale = "en";

/** Pick the best supported locale from Accept-Language, honouring q-values. */
function negotiate(req: NextRequest): string {
  const header = req.headers.get("accept-language") ?? "";
  let best = defaultLocale, bestQ = 0;
  for (const part of header.split(",")) {
    const [range, ...params] = part.trim().split(";");
    const code = range.trim().slice(0, 2).toLowerCase();
    if (!locales.includes(code)) continue;
    let q = 1;
    for (const prm of params) {
      const m = prm.trim().match(/^q=([0-9.]+)$/i);
      if (m) q = parseFloat(m[1]);
    }
    if (q > bestQ) { bestQ = q; best = code; }
  }
  return best;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = `/${negotiate(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|media|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)"],
};
