import CssBaseline from "@mui/material/CssBaseline";
import { Analytics } from "@vercel/analytics/react";
import { Provider } from "jotai";
import { AppProps } from "next/app";
import { useEffect } from "react";

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
      <CssBaseline />
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
};

export default CustomApp;
