import LocationOnIcon from "@mui/icons-material/LocationOn";
import fs from "fs";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import path from "path";
import { MarkerItem } from "../interfaces/MarkerItem";
const Map = dynamic(() => import("../components/Map2"), { ssr: false });

type Shop = {
  name: string;
  url: string;
  address: string;
  code: string;
  lat: string;
  lng: string;
  id: string;
};

type Props = {
  ramenShops: Shop[];
  udonShops: Shop[];
};

/**
 * マーカー用のオブジェクト作成.
 *
 * @param shop
 * @param category
 * @returns MarkerItem
 */
const createMarkerItem = (
  shop: Shop,
  category: string,
  icon: string
): MarkerItem => {
  return {
    position: [parseFloat(shop.lat), parseFloat(shop.lng)],
    icon: icon,
    popUp: (
      <div style={{ maxWidth: "120px" }}>
        <p style={{ fontWeight: "bolder" }}>
          <a href={shop.url} target="_blank" rel="noopener noreferrer">
            {shop.name}
          </a>
        </p>
        <p>
          <i>{category}</i>
        </p>
        <p style={{ fontSize: "smaller" }}>
          <LocationOnIcon fontSize="small" />
          <a
            href={`http://maps.google.co.jp/maps?q=${shop.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shop.address}
          </a>
        </p>
      </div>
    ),
  };
};

const Home = ({ ramenShops, udonShops }: Props): JSX.Element => {
  console.info("Hyakumeiten Map v0.1.0");

  const markerItems: MarkerItem[] = [
    ramenShops.map((shop) =>
      createMarkerItem(shop, "ラーメン百名店", "/static/marker-icons/ramen.png")
    ),
    udonShops.map((shop) =>
      createMarkerItem(shop, "うどん百名店", "/static/marker-icons/udon.png")
    ),
  ].flat();

  return (
    <div>
      <Map markerItems={markerItems}></Map>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const getShopDataFromJson = (fileName: string) => {
    const filePath = path.join(process.cwd(), "data", fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const shops = JSON.parse(fileContents).shops;
    return shops;
  };

  // データ読み込み.
  const ramenShops = getShopDataFromJson("ramen.json");
  const udonShops = getShopDataFromJson("udon.json");

  return {
    props: {
      ramenShops,
      udonShops,
    },
  };
};

export default Home;
