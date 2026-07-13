import { atomWithStorage } from "jotai/utils";
import { CategoryKey } from "../interfaces";

export type ShopMarkStatus = "want" | "visited";

export type ShopMark = {
  status: ShopMarkStatus;
  // 達成数のカテゴリ別集計にデータ読み込みなしで使えるよう、マーク時のカテゴリを保持する
  category: CategoryKey;
  // 一覧表示用。データ更新で百名店から外れた店でも店名を出せるようマーク時の店名を保持する
  // （初期のマークには入っていないことがある）
  name?: string;
};

// キーは utils/shops.ts の getShopMarkKey()（tabelog URL ベース）。
// shop.id は index 連番でデータ更新時にずれるため永続化キーには使わない。
// localStorage に永続化（キーは将来のスキーマ変更に備えて v1 を付与）
export const shopMarksAtom = atomWithStorage<Record<string, ShopMark>>(
  "hyakumeiten-map:shop-marks:v1",
  {},
  undefined,
  { getOnInit: true },
);
