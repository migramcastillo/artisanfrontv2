import Router from "next/router";
import withGA from "next-ga";
import "../assets/tailwind.css";
import "../helpers/font-awesome";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default withGA("UA-168607447-1" ,Router)(MyApp);
