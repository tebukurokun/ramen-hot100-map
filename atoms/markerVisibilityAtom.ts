import { atom } from "jotai";
import { CATEGORIES, CategoryKey, MarkerVisibility } from "../interfaces";

const initial = Object.fromEntries(
  (Object.keys(CATEGORIES) as CategoryKey[]).map((key) => [
    key,
    CATEGORIES[key].defaultVisible,
  ]),
) as MarkerVisibility;

export const markerVisibilityAtom = atom<MarkerVisibility>(initial);
