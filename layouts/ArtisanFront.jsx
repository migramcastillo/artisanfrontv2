import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/tailwind.css";
import "../helpers/font-awesome";
import Burger from "../components/Burger";

const ArtisanFront = ({ lang, hreflangs, ...props }) => {
  return (
    <>
      <Header lang={lang} hreflangs={hreflangs} />
      <main className="min-h-screen">{props.children}</main>
      <Footer lang={lang} hreflangs={hreflangs} />
      <Burger />
    </>
  );
};

export default ArtisanFront;
