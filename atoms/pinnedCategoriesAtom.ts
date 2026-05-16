import { atomWithStorage } from "jotai/utils";
import { CATEGORIES, CategoryKey, PinnedCategories } from "../interfaces";

const initial = Object.fromEntries(
  (Object.keys(CATEGORIES) as CategoryKey[]).map((key) => [
    key,
    CATEGORIES[key].defaultPinned,
  ]),
) as PinnedCategories;

// localStorage に永続化（キーは将来のスキーマ変更に備えて v1 を付与）
export const pinnedCategoriesAtom = atomWithStorage<PinnedCategories>(
  "hyakumeiten-map:pinned-categories:v1",
  initial,
  undefined,
  { getOnInit: true },
);
