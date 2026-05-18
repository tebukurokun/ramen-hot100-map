import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CircularProgress } from "@mui/material";
import { useAtomValue } from "jotai";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { mapCenterAtom, markerVisibilityAtom } from "../atoms";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey, Shop } from "../interfaces";
import { CategoryChipBar } from "./CategoryChipBar";
import { CategorySheet } from "./CategorySheet";
import { GeolocationButton } from "./GeolocationButton";

const createEmojiIcon = (emoji: string): L.DivIcon =>
  L.divIcon({
    html: `<div style="width:44px;height:44px;background:white;border:2px solid #666;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 2px 6px rgba(0,0,0,0.35);">${emoji}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -22],
    className: "",
  });

const createMarker = (shop: Shop, emoji: string): ReactNode => {
  return (
    <Marker
      key={shop.id}
      position={[parseFloat(shop.lat), parseFloat(shop.lng)]}
      icon={createEmojiIcon(emoji)}
    >
      <Popup>
        <div style={{ maxWidth: "120px" }}>
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
        </div>
      </Popup>
    </Marker>
  );
};

// 地図の中心を動的に更新するコンポーネント
const UpdateMapCenter = () => {
  const center = useAtomValue(mapCenterAtom);
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

const MapComponent = () => {
  const [isClient, setIsClient] = useState(false);

  const center: [number, number] = useAtomValue(mapCenterAtom);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 表示フラグがONのカテゴリのみマーカー表示
  const markerVisibility = useAtomValue(markerVisibilityAtom);

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
      CATEGORIES[key]
        .loader()
        .then((mod) => {
          const withCategory: Shop[] = mod.default.map((s) => ({
            ...s,
            category: key,
          }));
          setShopsByCategory((prev) => ({ ...prev, [key]: withCategory }));
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
        center={center}
        zoom={13}
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
              shopsByCategory[key]?.map((shop) =>
                createMarker(shop, CATEGORIES[key].emoji),
              ),
          )}
        </MarkerClusterGroup>
        <UpdateMapCenter />
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
      </MapContainer>
    </div>
  );
};

export default MapComponent;
