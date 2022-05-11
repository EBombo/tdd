import React from "reactn";
import "antd/dist/antd.css";
import { notification } from "antd";
import { useUser } from "../src/hooks";
import get from "lodash/get";
import { darkTheme, GlobalStyle, lightTheme } from "../src/theme";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../src/components/error-fallback/ErrorFallback";
import { WithConfiguration } from "../src/session/WithConfiguration";
import { WithAuthentication } from "../src/session/WithAuthentication";
import { config } from "../src/firebase";
import Head from "next/head";
import "../src/theme/globals.css";
import Script from "next/script";

const MyApp = ({ Component, pageProps }) => {
  const [authUserLS] = useUser();

  const showNotificationAnt = (message, description, type = "error") => notification[type]({ message, description });

  return (
    <ThemeProvider theme={get(authUserLS, "theme") === "lightTheme" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Head>
        <title>TDD</title>
        <meta charSet="UTF-8" />
        <meta name="google" value="notranslate" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0,user-scalable=0, shrink-to-fit=no"
        />
        <link rel="shortcut icon" href={`${config.storageUrl}/resources/icons/icon-72.svg`} />
        <link rel="shortcut icon" href={`${config.storageUrl}/resources/icons/icon-180.svg`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${config.storageUrl}/resources/icons/icon-180.svg`} />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="144x144"
          href={`${config.storageUrl}/resources/icons/icon-144.svg`}
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="114x114"
          href={`${config.storageUrl}/resources/icons/icon-114.svg`}
        />
        <link
          rel="apple-touch-icon-precomposed"
          sizes="72x72"
          href={`${config.storageUrl}/resources/icons/icon-72.svg`}
        />
        <link rel="apple-touch-icon-precomposed" href={`${config.storageUrl}/resources/icons/icon-180.svg`} />
        <meta property="og:image" content={`${config.storageUrl}/resources/icons/icon-180.svg`} />
        <link rel="manifest" href={`${config.serverUrl}/api/manifest`} />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Encode+Sans:wght@500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "bug3b6ngms");
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           window.smartlook||(function(d) {
            var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
            var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
            c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
            })(document);
            smartlook('init', '99e714fc677f977ad1017cf10949f6923a8e8e76', { region: 'eu' });
          `,
        }}
      />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <WithConfiguration>
          <WithAuthentication>
            <Component {...pageProps} showNotification={showNotificationAnt} />
          </WithAuthentication>
        </WithConfiguration>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default MyApp;
