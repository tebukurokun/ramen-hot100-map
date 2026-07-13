import { atom } from "jotai";
import { Shop } from "../interfaces";

export type FocusedShop = {
  shop: Shop;
  // 同じ店を再選択してもフォーカス処理（flyTo・ポップアップ表示）を再実行できるよう毎回変わる値
  token: number;
};

// 店名検索で選択された店。Map がこれを読んで地図移動＋ポップアップ表示する
export const focusedShopAtom = atom<FocusedShop | null>(null);
