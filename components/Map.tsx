import { CircularProgress } from "@mui/material";
import { useAtomValue } from "jotai";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { mapCenterAtom, markerVisibilityAtom } from "../atoms";
import { MarkerItem } from "../interfaces";
import { GeolocationButton } from "./GeolocationButton";
import { SettingButton } from "./SettingButton";
import SettingDialog from "./SettingDialog";

// Leaflet アイコンを動的に作成
const createIcon = (iconUrl: string) => {
  return L.icon({
    iconUrl,
    iconSize: [48, 48], // アイコンのサイズ（幅: 25px, 高さ: 41px）
    iconAnchor: [24, 48], // 下中央 (幅の半分, 高さ)
    popupAnchor: [0, -48], // ポップアップの位置
  });
};

// 地図の中心を動的に更新するコンポーネント
const UpdateMapCenter = () => {
  const center = useAtomValue(mapCenterAtom); // 現在の中心を取得
  const map = useMap(); // Leafletの地図インスタンスを取得

  useEffect(() => {
    map.setView(center, map.getZoom()); // 中心を更新
  }, [center, map]);

  return null;
};

const Map2 = ({ markerItems }: { markerItems: MarkerItem[] }) => {
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
        <MarkerClusterGroup
          zoomToBoundsOnClick={true}
          disableClusteringAtZoom={10}
          maxClusterRadius={5}
        >
          {markerItems
            .filter((item) => markerVisibility[item.category])
            .map((item, index) => (
              <Marker
                position={item.position}
                icon={createIcon(item.icon)}
                key={`marker-${index}`}
              >
                <Popup>{item.popUp}</Popup>
              </Marker>
            ))}
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

export default Map2;
