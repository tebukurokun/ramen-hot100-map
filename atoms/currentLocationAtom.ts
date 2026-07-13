import { atom } from "jotai";

export type CurrentLocation = {
  /** 取得した現在地の座標 */
  position: [number, number];
  /** 取得精度（メートル） */
  accuracy: number;
};

// null = まだ現在地を取得できていない（マーカー非表示）
export const currentLocationAtom = atom<CurrentLocation | null>(null);
