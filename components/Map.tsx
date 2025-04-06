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

/**
 * マーカーのエレメント生成.
 * @param shop
 * @param category
 * @param icon
 * @returns
 */
const createMarker = (shop: Shop, iconUrl: string): ReactNode => {
  return (
    <Marker
      key={shop.id}
      position={[parseFloat(shop.lat), parseFloat(shop.lng)]}
      icon={L.icon({
        iconUrl: iconUrl,
        iconSize: [48, 48], // アイコンのサイズ（幅: 48px, 高さ: 48px）
        iconAnchor: [24, 48], // アイコンの中心下部
        popupAnchor: [0, -48], // ポップアップの表示位置
      })}
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
                shop.name
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

const Map = ({
  ramenShops,
  udonShops,
}: {
  ramenShops: Shop[];
  udonShops: Shop[];
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

  // 地図の中心を動的に更新するコンポーネント
  const UpdateMapCenter = () => {
    const center = useAtomValue(mapCenterAtom); // 現在の中心を取得
    const map = useMap(); // Leafletの地図インスタンスを取得

    useEffect(() => {
      map.setView(center, map.getZoom()); // 中心を更新
    }, [center, map]);

    return null;
  };

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
            ramenShops.map((shop) =>
              createMarker(shop, "/static/marker-icons/ramen.png")
            )}
          {markerVisibility.udon &&
            udonShops.map((shop) =>
              createMarker(shop, "/static/marker-icons/udon.png")
            )}
        </MarkerClusterGroup>
        <UpdateMapCenter /> {/* 地図の中心を動的に更新 */}
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
          <GeolocationButton />
        </div>
      </MapContainer>
    </div>
  );
};

export default Map;
