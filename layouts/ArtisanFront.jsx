import Header from "../components/Header";
import Footer from "../components/Footer";

import "../assets/tailwind.css";
import Burger from "../components/Burger";

const ArtisanFront = props => {
  return (
    <>
      <Header />
      <main className="min-h-screen">{props.children}</main>
      <Burger />
      <Footer />
    </>
  );
};

export default ArtisanFront;
