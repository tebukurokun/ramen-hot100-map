import CssBaseline from "@mui/material/CssBaseline";
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
    </Provider>
  );
};

export default CustomApp;
