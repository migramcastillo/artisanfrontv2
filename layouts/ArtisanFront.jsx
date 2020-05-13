import Header from "../components/Header";
import Footer from "../components/Footer";

import Burger from "../components/Burger";

const ArtisanFront = ({ lang, hreflangs, ...props }) => {
  return (
    <>
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
