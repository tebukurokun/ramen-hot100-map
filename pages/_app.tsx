import { Analytics } from "@vercel/analytics/next";
import { Provider } from "jotai";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/main.css";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider>
      <Head>
        <title>Hyakumeiten Map</title>
        <link rel="shortcut icon" href="/static/favicon/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="ラーメン百名店の情報をマップで見ることができるサイトです。"
        />
        <meta
          name="keywords"
          content="ラーメン, 地図, マップ, 百名店, ラーメン百名店, 百名店マップ"
        />
        <meta name="author" content="tebukuro" />
        <meta property="og:title" content="Hyakumeiten Map" />
        <meta
          property="og:description"
          content="ラーメン百名店の情報をマップで見ることができるサイトです。"
        />
        <meta property="og:site_name" content="Hyakumeiten Map" />
        <meta property="og:url" content="https://hyakumeiten-map.vercel.app/" />
        <meta property="og:image" content="/static/preview.jpg" />
        <meta property="og:type" content="website" />
        <link rel="preload" href="/static/marker-icons/ramen.png" as="image" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
};

export default CustomApp;
