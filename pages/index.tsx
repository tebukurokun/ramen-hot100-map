import LocationOnIcon from "@mui/icons-material/LocationOn";
import fs from "fs";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import path from "path";
import { MarkerItem, Shop, ShopCategory } from "../interfaces";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

type Props = {
  ramenShops: Shop[];
  udonShops: Shop[];
};

const version = process.env.NEXT_PUBLIC_APP_VERSION;
console.info(`Hyakumeiten Map v${version}`);

/**
 * マーカー用のオブジェクト作成.
 *
 * @param shop
 * @param category
 * @returns MarkerItem
 */
const createMarkerItem = (
  shop: Shop,
  category: keyof typeof ShopCategory,
  icon: string
): MarkerItem => {
  return {
    category: category,
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
          <i>{ShopCategory[category]}</i>
        </p>
        <p style={{ fontSize: "smaller" }}>
          <LocationOnIcon fontSize="small" />
          <a
            href={`http://maps.google.co.jp/maps?q=${shop.name} ${shop.address}`}
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
  // マーカー用データを作成して渡す.
  const markerItems: MarkerItem[] = [
    ramenShops.map((shop) =>
      createMarkerItem(shop, "ramen", "/static/marker-icons/ramen.png")
    ),
    udonShops.map((shop) =>
      createMarkerItem(shop, "udon", "/static/marker-icons/udon.png")
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
