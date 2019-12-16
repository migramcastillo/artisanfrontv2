import Head from "next/head";
import ArtisanFront from "../layouts/ArtisanFront";
import HomeArticles from "../components/HomeArticles/HomeArticles";
import HomeButton from "../components/HomeButton/HomeButton";
import HomeIntro from "../components/HomeIntro/HomeIntro";
import WithLanguage from "../hoc/with-language";
import NextDocsButton from "../components/next-docs-button/next-docs-button";

export const HomePage = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>
          Artisan Front - Artículos y cursos gratis de NextJS y NodeJS
        </title>
      </Head>
      <div className="container mx-auto p-2">
        <h1 className="text-center text-3xl font-semibold text-gray-900 my-4">
          Articulos y cursos gratis de NextJS, NodeJS y más
        </h1>
        {lang === "es" && (
          <div className="text-center py-4">
            <NextDocsButton />
          </div>
        )}
        <h2 className="text-2xl text-center text-gray-800 font-semibold my-2">
          Cursos completos gratis
        </h2>
        <HomeArticles />
        <HomeButton />

        <h1 className="text-2xl text-center text-gray-800 font-bold mb-6 mt-12">
          Latest articles
        </h1>
        <HomeArticles />
        <HomeButton />
      </div>
    </ArtisanFront>
  );
};

HomePage.getInitialProps = async ctx => {
  return {
    hreflangs: { es: "/", en: "/home" }
  };
};

export default WithLanguage(HomePage, "es");
