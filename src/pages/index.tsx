import LocationOnIcon from "@material-ui/icons/LocationOn";
import fs from "fs";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
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
};

const Home = ({ ramenShops }: Props): JSX.Element => {
  console.info("Hyakumeiten Map v0.1.0");

  // TODO: 別の関数にする.
  const markerItems: MarkerItem[] = ramenShops.map((shop) => ({
    position: [parseFloat(shop.lat), parseFloat(shop.lng)],
    icon: "/static/marker-icons/ramen.png",
    popUp: (
      <div style={{ maxWidth: "120px" }}>
        <p style={{ fontWeight: "bolder" }}>
          <a href={shop.url} target="_blank" rel="noopener noreferrer">
            {shop.name}
          </a>
        </p>
        <p>
          <i>ラーメン百名店</i>
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
  }));

  return (
    <div>
      <Head>
        <title>Hyakumeiten Map</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="ラーメン百名店の情報をマップで見ることができるサイトです。"
        />
        <meta
          property="og:description"
          content="ラーメン百名店の情報をマップで見ることができるサイトです。"
        />
      </Head>
      <Map markerItems={markerItems}></Map>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // データ読み込み.
  const ramenFilePath = path.join(process.cwd(), "data", "ramen.json");
  const ramenFileContents = fs.readFileSync(ramenFilePath, "utf-8");
  const ramenShops = JSON.parse(ramenFileContents).shops;

  return {
    props: {
      ramenShops,
    },
  };
};

export default Home;
