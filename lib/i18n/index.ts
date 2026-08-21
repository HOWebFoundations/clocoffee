import type { Locale } from "../config";
import type { Dict } from "./types";
import { en } from "./en";
import { ar } from "./ar";
import { fr } from "./fr";

export type { Dict };
export const dictionaries: Record<Locale, Dict> = { en, ar, fr };
export const getDict = (locale: Locale): Dict => dictionaries[locale] ?? en;
