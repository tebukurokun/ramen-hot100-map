import fs from "fs";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import path from "path";
import { JSX } from "react";
import { CATEGORIES, CATEGORY_KEYS, CategoryKey, Shop } from "../interfaces";

const MapComponent = dynamic(() => import("../components/Map"), { ssr: false });

type Props = {
  shopsByCategory: Record<CategoryKey, Shop[]>;
};

const version = process.env.NEXT_PUBLIC_APP_VERSION;
console.info(`Hyakumeiten Map v${version}`);

const Home = ({ shopsByCategory }: Props): JSX.Element => {
  return (
    <div>
      <MapComponent shopsByCategory={shopsByCategory} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const loadShops = (fileName: string, key: CategoryKey): Shop[] => {
    const filePath = path.join(process.cwd(), "data", fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const shops = JSON.parse(fileContents).shops as Omit<Shop, "category">[];
    return shops.map((shop) => ({ ...shop, category: key }));
  };

  const shopsByCategory = Object.fromEntries(
    CATEGORY_KEYS.map((key) => [key, loadShops(CATEGORIES[key].dataFile, key)]),
  ) as Record<CategoryKey, Shop[]>;

  return {
    props: { shopsByCategory },
  };
};

export default Home;
