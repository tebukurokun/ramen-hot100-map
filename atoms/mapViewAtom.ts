import { atom } from "jotai";

export type MapView = {
  center: [number, number];
  zoom: number;
};

// Leaflet の実際の表示状態（moveend ごとに Map が書き込む）。
// mapCenterAtom は「地図をここへ動かせ」という指示用で、パン操作では更新されない点が異なる
export const mapViewAtom = atom<MapView | null>(null);
