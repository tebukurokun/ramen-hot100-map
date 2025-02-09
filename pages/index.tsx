import fs from "fs";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import path from "path";
import { Shop } from "../interfaces";
const Map = dynamic(() => import("../components/Map"), { ssr: false });

type Props = {
  ramenShops: Shop[];
  udonShops: Shop[];
};

const version = process.env.NEXT_PUBLIC_APP_VERSION;
console.info(`Hyakumeiten Map v${version}`);

const Home = ({ ramenShops, udonShops }: Props): JSX.Element => {
  return (
    <div>
      <Map ramenShops={ramenShops} udonShops={udonShops}></Map>
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
