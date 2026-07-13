import { CATEGORIES, CATEGORY_KEYS, CategoryKey } from "../interfaces";

// 地図状態のURLハッシュ表現（OSM風）: #map=<zoom>/<lat>/<lng>&cats=ramen,udon
export type MapHashState = {
  zoom: number;
  lat: number;
  lng: number;
  // null = ハッシュに cats 指定なし（localStorage の値をそのまま使う）
  cats: CategoryKey[] | null;
};

const HASH_PATTERN =
  /^#map=(\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)(?:&cats=([a-z0-9_,]*))?$/;

export const parseMapHash = (hash: string): MapHashState | null => {
  const match = hash.match(HASH_PATTERN);
  if (!match) return null;

  const zoom = Number(match[1]);
  const lat = Number(match[2]);
  const lng = Number(match[3]);
  if (zoom < 1 || zoom > 19) return null;
  if (lat < -90 || lat > 90) return null;
  if (lng < -180 || lng > 180) return null;

  const cats =
    match[4] != null
      ? match[4]
          .split(",")
          .filter((key): key is CategoryKey => key in CATEGORIES)
      : null;
  return { zoom, lat, lng, cats };
};

export const formatMapHash = (
  zoom: number,
  lat: number,
  lng: number,
  visibility: Record<CategoryKey, boolean>,
): string => {
  const cats = CATEGORY_KEYS.filter((key) => visibility[key]);
  return `#map=${zoom}/${lat.toFixed(5)}/${lng.toFixed(5)}&cats=${cats.join(",")}`;
};
