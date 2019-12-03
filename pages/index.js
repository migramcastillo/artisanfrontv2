import Head from "next/head";
import ArtisanFront from "../layouts/ArtisanFront";
import HomeArticles from "../components/HomeArticles/HomeArticles";
import HomeButton from "../components/HomeButton/HomeButton";
import HomeIntro from "../components/HomeIntro/HomeIntro";
import WithLanguage from "../hoc/with-language";

export const HomePage = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>Artisan Front</title>
      </Head>
      <div className="text-center px-2 py-4 bg-white">
        <HomeIntro lang={lang} />
      </div>
      <div className="container mx-auto p-2">
        <h1 className="text-2xl text-center text-gray-800 font-bold my-4">
          Free full courses
        </h1>
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
