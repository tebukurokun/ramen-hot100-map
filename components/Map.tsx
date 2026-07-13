import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { Chip, CircularProgress } from "@mui/material";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import { JSX, useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Marker,
  Pane,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import {
  currentLocationAtom,
  focusedShopAtom,
  mapCenterAtom,
  mapViewAtom,
  markerVisibilityAtom,
  ShopMarkStatus,
  shopMarksAtom,
} from "../atoms";
import {
  CATEGORIES,
  CATEGORY_KEYS,
  CategoryKey,
  MarkerVisibility,
  Shop,
} from "../interfaces";
import { formatMapHash, parseMapHash } from "../utils/mapHash";
import {
  getAwardYear,
  getShopMarkKey,
  loadCategoryShops,
} from "../utils/shops";
import { CategoryChipBar } from "./CategoryChipBar";
import { CategorySheet } from "./CategorySheet";
import { GeolocationButton } from "./GeolocationButton";
import { MapControlButton } from "./MapControlButton";
import { ShopListSheet } from "./ShopListSheet";
import { ShopSearch } from "./ShopSearch";

// 行きたい/行ったマークの色・バッジ定義（ポップアップのボタンとマーカーで共用）
const MARK_STYLE: Record<
  ShopMarkStatus,
  { color: string; badge: string; label: string }
> = {
  want: { color: "#F5B400", badge: "★", label: "⭐ 行きたい" },
  visited: { color: "#2E7D32", badge: "✓", label: "✅ 行った" },
};

// divIcon は (カテゴリ, マーク) の組み合わせごとにメモ化する
const iconCache = new Map<string, L.DivIcon>();

const createEmojiIcon = (
  category: CategoryKey,
  mark?: ShopMarkStatus,
): L.DivIcon => {
  const cacheKey = `${category}:${mark ?? "none"}`;
  const cached = iconCache.get(cacheKey);
  if (cached) return cached;

  // 枠線色はカテゴリのチップ色に対応させる。マークはバッジのみで表現する
  const { emoji, switchColor } = CATEGORIES[category];
  const badge = mark
    ? `<div style="position:absolute;top:-5px;right:-5px;width:18px;height:18px;background:${MARK_STYLE[mark].color};border-radius:50%;color:white;font-size:12px;line-height:18px;text-align:center;font-weight:bold;">${MARK_STYLE[mark].badge}</div>`
    : "";
  const icon = L.divIcon({
    html: `<div style="position:relative;width:44px;height:44px;background:white;border:2px solid ${switchColor};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 2px 6px rgba(0,0,0,0.35);">${emoji}${badge}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
    className: "",
  });
  iconCache.set(cacheKey, icon);
  return icon;
};

// 店マーカー（ポップアップに店情報＋行きたい/行ったトグルを表示）
const ShopMarker = ({ shop }: { shop: Shop }): JSX.Element => {
  const [marks, setMarks] = useAtom(shopMarksAtom);
  const focusedShop = useAtomValue(focusedShopAtom);
  const markerRef = useRef<L.Marker>(null);

  // position の参照を安定させる。毎レンダー新しい配列を渡すと react-leaflet が
  // setLatLng を呼び、markercluster がマーカーを付け外しして開いているポップアップが閉じてしまう
  const position = useMemo<[number, number]>(
    () => [parseFloat(shop.lat), parseFloat(shop.lng)],
    [shop.lat, shop.lng],
  );

  const markKey = getShopMarkKey(shop);
  const mark = marks[markKey];

  // 店名検索で選択された店ならポップアップを開く（flyTo が落ち着いてから）。
  // クラスタに含まれている間は開けないので best-effort
  const focusToken =
    focusedShop?.shop.id === shop.id ? focusedShop.token : null;
  useEffect(() => {
    if (focusToken === null) return;
    const timer = setTimeout(() => {
      markerRef.current?.openPopup();
    }, 900);
    return () => clearTimeout(timer);
  }, [focusToken]);

  const handleToggleMark = (status: ShopMarkStatus) => () => {
    setMarks((prev) => {
      const next = { ...prev };
      if (prev[markKey]?.status === status) {
        delete next[markKey];
      } else {
        next[markKey] = { status, category: shop.category, name: shop.name };
      }
      return next;
    });
  };

  return (
    <Marker
      ref={markerRef}
      position={position}
      icon={createEmojiIcon(shop.category, mark?.status)}
    >
      <Popup>
        <div style={{ maxWidth: "200px" }}>
          <p style={{ fontWeight: "bolder" }}>
            <a
              href={shop.url}
              target="_blank"
              rel={shop.url ? "noopener noreferrer" : undefined}
            >
              {shop.name}
            </a>
          </p>
          <p>
            <i>{CATEGORIES[shop.category].label}</i>
            {getAwardYear(shop) && (
              <span
                style={{
                  marginLeft: "6px",
                  padding: "1px 6px",
                  borderRadius: "8px",
                  background: "#FFF4D6",
                  color: "#8A6D00",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {getAwardYear(shop)}年選出
              </span>
            )}
          </p>
          <p style={{ fontSize: "smaller" }}>
            <LocationOnIcon fontSize="small" />
            <a
              href={`http://maps.google.co.jp/maps?q=${encodeURIComponent(
                shop.name,
              )} ${encodeURIComponent(shop.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shop.address}
            </a>
          </p>
          {/* 行きたい/行ったトグル */}
          <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
            {(Object.keys(MARK_STYLE) as ShopMarkStatus[]).map((status) => {
              const isActive = mark?.status === status;
              const { color, label } = MARK_STYLE[status];
              return (
                <Chip
                  key={status}
                  label={label}
                  size="small"
                  variant={isActive ? "filled" : "outlined"}
                  onClick={handleToggleMark(status)}
                  sx={
                    isActive
                      ? {
                          backgroundColor: color,
                          color: "white",
                          "&:hover": { backgroundColor: color },
                        }
                      : { color: "#666" }
                  }
                />
              );
            })}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

// 店名検索で選択された店へ地図を移動するコンポーネント
const FocusShopHandler = () => {
  const focusedShop = useAtomValue(focusedShopAtom);
  const map = useMap();

  useEffect(() => {
    if (!focusedShop) return;
    const { shop } = focusedShop;
    map.flyTo([parseFloat(shop.lat), parseFloat(shop.lng)], 17, {
      duration: 0.8,
    });
  }, [focusedShop, map]);

  return null;
};

// 現在地マーカー（青点＋精度円）。現在地未取得の間は何も表示しない
const CurrentLocationMarker = () => {
  const currentLocation = useAtomValue(currentLocationAtom);

  if (!currentLocation) return null;

  const { position, accuracy } = currentLocation;

  // マーカーペイン(600)より上、ポップアップ(700)より下に表示する
  return (
    <Pane name="current-location" style={{ zIndex: 650 }}>
      <Circle
        center={position}
        radius={accuracy}
        interactive={false}
        pathOptions={{
          color: "#1a73e8",
          weight: 1,
          opacity: 0.4,
          fillColor: "#1a73e8",
          fillOpacity: 0.15,
        }}
      />
      <CircleMarker
        center={position}
        radius={8}
        interactive={false}
        pathOptions={{
          color: "#ffffff",
          weight: 3,
          fillColor: "#1a73e8",
          fillOpacity: 1,
        }}
      />
    </Pane>
  );
};

// 地図の中心を動的に更新するコンポーネント
const UpdateMapCenter = () => {
  const center = useAtomValue(mapCenterAtom);
  const map = useMap();

  // マウント時は動かさない（URLハッシュから復元した初期位置を
  // atom のデフォルト値で上書きしないため）。atom の変更にのみ反応する
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

// 地図状態（中心・ズーム・ONカテゴリ）をURLハッシュと mapViewAtom に同期するコンポーネント
const MapHashSync = () => {
  const map = useMap();
  const markerVisibility = useAtomValue(markerVisibilityAtom);
  const setMapView = useSetAtom(mapViewAtom);

  useEffect(() => {
    const update = () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapView({ center: [center.lat, center.lng], zoom });
      // 履歴を汚さないよう replaceState でハッシュだけ書き換える
      history.replaceState(
        null,
        "",
        formatMapHash(zoom, center.lat, center.lng, markerVisibility),
      );
    };
    update();
    map.on("moveend", update);
    return () => {
      map.off("moveend", update);
    };
  }, [map, markerVisibility, setMapView]);

  return null;
};

const MapComponent = () => {
  const [isClient, setIsClient] = useState(false);

  const center: [number, number] = useAtomValue(mapCenterAtom);

  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

  // 表示フラグがONのカテゴリのみマーカー表示
  const [markerVisibility, setMarkerVisibility] = useAtom(markerVisibilityAtom);

  // URLハッシュからの初期状態復元（共有リンク・リロード用）。初回レンダー時に一度だけ読む
  const initialHash = useMemo(
    () =>
      typeof window === "undefined" ? null : parseMapHash(window.location.hash),
    [],
  );

  // ハッシュに cats 指定があればカテゴリ表示状態を復元する
  useEffect(() => {
    const cats = initialHash?.cats;
    if (!cats) return;
    setMarkerVisibility(
      Object.fromEntries(
        CATEGORY_KEYS.map((key) => [key, cats.includes(key)]),
      ) as MarkerVisibility,
    );
  }, [initialHash, setMarkerVisibility]);

  // カテゴリごとのデータを on-demand で取得・キャッシュ
  const [shopsByCategory, setShopsByCategory] = useState<
    Partial<Record<CategoryKey, Shop[]>>
  >({});
  const inFlightRef = useRef<Set<CategoryKey>>(new Set());

  useEffect(() => {
    // クライアントサイドでのみ実行されるようにする
    setIsClient(true);
  }, []);

  useEffect(() => {
    for (const key of CATEGORY_KEYS) {
      if (!markerVisibility[key]) continue;
      if (shopsByCategory[key]) continue;
      if (inFlightRef.current.has(key)) continue;
      inFlightRef.current.add(key);
      loadCategoryShops(key)
        .then((shops) => {
          setShopsByCategory((prev) => ({ ...prev, [key]: shops }));
        })
        .catch((err) => {
          console.error(`Failed to load category ${key}:`, err);
        })
        .finally(() => {
          inFlightRef.current.delete(key);
        });
    }
  }, [markerVisibility, shopsByCategory]);

  if (!isClient) {
    // SSR中はローディング画面を表示.
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <MapContainer
        center={initialHash ? [initialHash.lat, initialHash.lng] : center}
        zoom={initialHash?.zoom ?? 13}
        scrollWheelZoom
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* @ts-ignore */}
        <MarkerClusterGroup maxClusterRadius={30}>
          {CATEGORY_KEYS.map(
            (key) =>
              markerVisibility[key] &&
              shopsByCategory[key]?.map((shop) => (
                <ShopMarker key={shop.id} shop={shop} />
              )),
          )}
        </MarkerClusterGroup>
        <CurrentLocationMarker />
        <UpdateMapCenter />
        <FocusShopHandler />
        <MapHashSync />
        {/* 店名検索・マークリストボタン（右上） */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <ShopSearch />
          <MapControlButton
            onClick={() => setIsListOpen(true)}
            aria-label="店リストを開く"
          >
            <StarIcon sx={{ fontSize: "2rem", color: "#F5B400" }} />
          </MapControlButton>
        </div>
        {/* 現在地ボタン（右下、チップバーの真上） */}
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: "10px",
            zIndex: 1000,
          }}
        >
          <GeolocationButton />
        </div>
        {/* カテゴリチップバー（下端） */}
        <CategoryChipBar onOpenSheet={() => setIsSheetOpen(true)} />
        {/* カテゴリシート */}
        <CategorySheet isOpen={isSheetOpen} setIsOpen={setIsSheetOpen} />
        {/* 店リストシート（周辺/行きたい/行った） */}
        <ShopListSheet isOpen={isListOpen} setIsOpen={setIsListOpen} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
