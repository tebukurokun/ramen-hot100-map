import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { JSX } from "react";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          {/* GAのメインスクリプト読込 */}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-SZEKVQ44B5"
            strategy="afterInteractive"
          />

          {/* GAの初期化スクリプト挿入 */}
          <Script
            id="ga-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-SZEKVQ44B5', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
