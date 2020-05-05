import Head from "next/head";
import ArtisanFront from "../layouts/ArtisanFront";
import HomeArticles from "../components/HomeArticles/HomeArticles";
import ViewAllButton from "../components/view-all-button";
import { getLastArticles } from "../helpers/get-articles";
import i18n from "../locales/home.i18n";

const HomePage = ({ lang, labels, hreflangs, articles, ...props }) => {
  return (
    <ArtisanFront>
      <Head>
        <title>Artisan Front - {labels.title}</title>
        <meta name="description" content={labels.description} />
      </Head>
      <div className="container mx-auto p-2">
        <h1 className="text-center text-3xl font-semibold text-gray-900 my-4">
          {labels.h1}
        </h1>
        <h2 className="text-2xl text-center text-gray-800 font-semibold my-2">
          {labels.h2Courses}
        </h2>
        <HomeArticles articles={articles} />
        <div className="py-4">
          <ViewAllButton href="/cursos" />
        </div>

        <h2 className="text-2xl text-center text-gray-800 font-bold mb-6 mt-12">
          {labels.h2Articles}
        </h2>
        <HomeArticles articles={articles} />
        <div className="py-4">
          <ViewAllButton href="/articulos" />
        </div>
      </div>
    </ArtisanFront>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const data = getLastArticles(3);
  const labels = i18n.es;

  return {
    articles: data,
    labels,
  };
};

export default HomePage;
