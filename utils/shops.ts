import { CATEGORIES, CATEGORY_KEYS, CategoryKey, Shop } from "../interfaces";

const categoryShopsPromises = new Map<CategoryKey, Promise<Shop[]>>();

// 1カテゴリの店データを読み込む（category 注入済み）。
// チャンクの取得は一度だけ行い、結果はモジュールレベルでキャッシュする
export const loadCategoryShops = (key: CategoryKey): Promise<Shop[]> => {
  let promise = categoryShopsPromises.get(key);
  if (!promise) {
    promise = CATEGORIES[key]
      .loader()
      .then((mod) => mod.default.map((s): Shop => ({ ...s, category: key })));
    categoryShopsPromises.set(key, promise);
  }
  return promise;
};

// 全カテゴリの店データを読み込んで結合する（店名検索用）
export const loadAllShops = (): Promise<Shop[]> =>
  Promise.all(CATEGORY_KEYS.map(loadCategoryShops)).then((byCategory) =>
    byCategory.flat(),
  );

// 行きたい/行ったマークの永続化キー。
// shop.id は index 連番でデータ更新時にずれ、code には年が入るため、
// 店単位で安定している tabelog URL を使う
export const getShopMarkKey = (shop: Shop): string =>
  shop.url || `${shop.name}|${shop.address}`;

// 検索用の文字列正規化: NFKC → 小文字化 → カタカナをひらがなへ → 空白除去
export const normalizeForSearch = (text: string): string =>
  text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .replace(/\s+/g, "");
