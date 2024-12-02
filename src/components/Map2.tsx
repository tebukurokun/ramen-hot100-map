import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { MarkerItem } from "../interfaces/MarkerItem";

const position: [number, number] = [35.681236, 139.767125];

// Leaflet アイコンを動的に作成
const createIcon = (iconUrl: string) => {
  return L.icon({
    iconUrl,
    iconSize: [48, 48], // アイコンのサイズ（幅: 25px, 高さ: 41px）
    iconAnchor: [24, 48], // 下中央 (幅の半分, 高さ)
    popupAnchor: [0, -48], // ポップアップの位置
  });
};

const Map2 = ({ markerItems }: { markerItems: MarkerItem[] }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // クライアントサイドでのみ実行されるようにする
    setIsClient(true);
  }, []);

  if (!isClient) {
    // SSR中は空のdivをレンダリング
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerItems.map((item, index) => (
          <Marker
            position={item.position}
            icon={createIcon(item.icon)}
            key={`marker-${index}`}
          >
            <Popup>{item.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map2;
