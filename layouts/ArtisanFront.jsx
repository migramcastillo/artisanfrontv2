import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Burger from "../components/Burger";

const ArtisanFront = ({ lang, hreflangs, ...props }) => {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header lang={lang} hreflangs={hreflangs} />
      <main className="min-h-screen">{props.children}</main>
      <Footer lang={lang} hreflangs={hreflangs} />
      <Burger />
      <style jsx>{`
        .min-h-screen {
          min-height: 80vh;
        }
      `}</style>
    </>
  );
};

export default ArtisanFront;
