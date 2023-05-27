import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spotify Player</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="A simple player using the spotify sdk api"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
