import { atomWithStorage } from "jotai/utils";
import { CATEGORIES, CategoryKey, MarkerVisibility } from "../interfaces";

const initial = Object.fromEntries(
  (Object.keys(CATEGORIES) as CategoryKey[]).map((key) => [
    key,
    CATEGORIES[key].defaultVisible,
  ]),
) as MarkerVisibility;

// localStorage に永続化（キーは将来のスキーマ変更に備えて v1 を付与）
export const markerVisibilityAtom = atomWithStorage<MarkerVisibility>(
  "hyakumeiten-map:marker-visibility:v1",
  initial,
  undefined,
  { getOnInit: true },
);
