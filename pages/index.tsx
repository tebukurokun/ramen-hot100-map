import fs from "fs";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import path from "path";
import { Shop, ShopCategory } from "../interfaces";

const MapComponent = dynamic(() => import("../components/Map"), { ssr: false });

type Props = {
  ramenShops: Shop[];
  udonShops: Shop[];
  curryShops: Shop[];
};

const version = process.env.NEXT_PUBLIC_APP_VERSION;
console.info(`Hyakumeiten Map v${version}`);

const Home = ({ ramenShops, udonShops, curryShops }: Props): JSX.Element => {
  return (
    <div>
      <MapComponent
        ramenShops={ramenShops}
        udonShops={udonShops}
        curryShops={curryShops}
      ></MapComponent>
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

  // データ読み込みとカテゴリー設定.
  const ramenShops = getShopDataFromJson("ramen.json").map((shop: Shop) => ({
    ...shop,
    category: ShopCategory["ramen"],
  }));

  const udonShops = getShopDataFromJson("udon.json").map((shop: Shop) => ({
    ...shop,
    category: ShopCategory["udon"],
  }));

  const curryShops = getShopDataFromJson("curry.json").map((shop: Shop) => ({
    ...shop,
    category: ShopCategory["curry"],
  }));

  return {
    props: {
      ramenShops,
      udonShops,
      curryShops,
    },
  };
};

export default Home;
