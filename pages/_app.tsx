import { Analytics } from "@vercel/analytics/next";
import { Provider } from "jotai";
import { AppProps } from "next/app";
import Head from "next/head";
import { JSX } from "react";
import "../styles/main.css";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider>
      <Head>
        <title>Hyakumeiten Map</title>
        <link rel="icon" href="/static/favicon/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/static/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/static/favicon/icon-192.png"
        />
        <link
          rel="apple-touch-icon"
          href="/static/favicon/apple-touch-icon.png"
        />
        {/* PWA: ホーム画面インストール用 manifest（Service Worker なしの最小構成） */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="mobile-web-app-capable" content="yes" />
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
        <meta
          property="og:url"
          content="https://hyakumeiten-map.tebukuro.me/"
        />
        <meta property="og:image" content="/static/preview.jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
};

export default CustomApp;
