import { GetStaticProps } from "next";
import Head from "next/head";

import { MapProps } from "../interfaces";
import MapIndex from "../components/MapIndex";
import { shopData } from "../utils/shops-data";

const WithStaticProps = ({ items }: MapProps): JSX.Element => {
  console.info("Hyakumeiten Map v0.0.1");
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
      <MapIndex items={items} />
    </div>
  );
};

export default WithStaticProps;

export const getStaticProps: GetStaticProps = async () => {
  const items = shopData;

  return {
    props: {
      items: items,
    },
  };
};
