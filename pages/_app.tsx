import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import "../styles/main.css";

const CustomApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles: Element | null =
      document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider>
      <Head>
        <title>Hyakumeiten Map</title>
        <link rel="shortcut icon" href="static/favicon/favicon.ico" />
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
        <link rel="preload" href="/static/marker-icons/ramen.png" as="image" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
};

export default CustomApp;
