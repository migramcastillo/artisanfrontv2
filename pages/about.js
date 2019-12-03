import Head from "next/head";
import ArtisanFront from "../layouts/ArtisanFront";
import WithLanguage from "../hoc/with-language";

export const AboutPage = ({ lang, hreflangs }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>Acerca de Artisan Front</title>
      </Head>
      <div className="container mx-auto py-4">
        <h1 className="text-3xl text-semibold text-gray-900">
          {lang === "es" ? "Acerca de Artisan Front" : "About Artisan Front"}
        </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </ArtisanFront>
  );
};
AboutPage.getInitialProps = async ctx => {
  return {
    hreflangs: { es: "/acerca-de", en: "/about" }
  };
};

export default WithLanguage(AboutPage, "en");
