import type { CategoryKey } from "./categories";

export {
  CATEGORIES,
  CATEGORY_KEYS,
  type CategoryConfig,
  type CategoryKey,
  SECTION_KEYS,
  SECTIONS,
  type SectionKey,
} from "./categories";

// ピン留め状態
export type PinnedCategories = Record<CategoryKey, boolean>;

// 店データ
export type Shop = {
  name: string;
  url: string;
  address: string;
  code: string;
  lat: string;
  lng: string;
  id: string;
  category: CategoryKey;
};

// 店カテゴリー表示設定
export type MarkerVisibility = Record<CategoryKey, boolean>;
