import { CATEGORIES, CATEGORY_KEYS, Shop } from "../interfaces";

let allShopsPromise: Promise<Shop[]> | null = null;

// 全カテゴリの店データを読み込んで結合する（店名検索用）。
// チャンクの取得は一度だけ行い、結果はモジュールレベルでキャッシュする
export const loadAllShops = (): Promise<Shop[]> => {
  allShopsPromise ??= Promise.all(
    CATEGORY_KEYS.map(async (key) => {
      const mod = await CATEGORIES[key].loader();
      return mod.default.map((s): Shop => ({ ...s, category: key }));
    }),
  ).then((byCategory) => byCategory.flat());
  return allShopsPromise;
};

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
