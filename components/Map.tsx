import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CircularProgress } from "@mui/material";
import { useAtomValue } from "jotai";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import { ReactNode, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { mapCenterAtom, markerVisibilityAtom } from "../atoms";
import { Shop } from "../interfaces";
import { GeolocationButton } from "./GeolocationButton";
import { SettingButton } from "./SettingButton";
import SettingDialog from "./SettingDialog";

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
            <i>{shop.category}</i>
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

const MapComponent = ({
  ramenShops,
  udonShops,
  curryShops,
}: {
  ramenShops: Shop[];
  udonShops: Shop[];
  curryShops: Shop[];
}) => {
  const [isClient, setIsClient] = useState(false);

  const center: [number, number] = useAtomValue(mapCenterAtom);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 表示フラグがONのカテゴリのみマーカー表示
  const markerVisibility = useAtomValue(markerVisibilityAtom);

  useEffect(() => {
    // クライアントサイドでのみ実行されるようにする
    setIsClient(true);
  }, []);

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
        <MarkerClusterGroup maxClusterRadius={40}>
          {markerVisibility.ramen &&
            ramenShops.map((shop) => createMarker(shop, "🍜"))}
          {markerVisibility.udon &&
            udonShops.map((shop) => createMarker(shop, "🥣"))}
          {markerVisibility.curry &&
            curryShops.map((shop) => createMarker(shop, "🍛"))}
        </MarkerClusterGroup>
        <UpdateMapCenter />
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            zIndex: 1000, // マップの要素より前面に表示
            padding: "10px",
          }}
        >
          {/* 設定ボタン */}
          <SettingButton onClick={() => setIsDialogOpen(true)} />
        </div>
        <SettingDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            right: "0px",
            zIndex: 1000, // マップの要素より前面に表示
            padding: "10px",
          }}
        >
          {/* 現在地ボタン */}
          <GeolocationButton />
        </div>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
