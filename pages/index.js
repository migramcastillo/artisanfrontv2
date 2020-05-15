import Head from "next/head";
import ArtisanFront from "../layouts/ArtisanFront";
import ViewAllButton from "../components/view-all-button";
import { getLastArticles } from "../helpers/get-articles";
import i18n from "../locales/home.i18n";
import { getLastCourses } from "../helpers/get-courses";
import HomeListing from "../components/HomeListing/HomeListing";

const HomePage = ({ lang, labels, hreflangs, articles, courses }) => {
  return (
    <ArtisanFront>
      <Head>
        <title>Artisan Front - {labels.title}</title>
        <meta name="description" content={labels.description} />
      </Head>
      <div className="container mx-auto p-2">
        <h1 className="text-center text-3xl font-semibold text-gray-900 my-4">
          Artículos y cursos de desarrollo web gratis
        </h1>
        <h2 className="text-2xl text-center text-gray-800 font-semibold my-2">
          Últimos cursos
        </h2>
        <HomeListing listing={courses} kind="course" />
        <div className="py-4">
          <ViewAllButton href="/cursos" />
        </div>

        <h2 className="text-2xl text-center text-gray-800 font-bold mb-6 mt-12">
          Últimos artículos
        </h2>
        <HomeListing listing={articles} kind="article" />
        <div className="py-4">
          <ViewAllButton href="/articulos" />
        </div>
      </div>
    </ArtisanFront>
  );
};

HomePage.getInitialProps = async (ctx) => {
  const labels = i18n.es;

  return {
    articles: getLastArticles(3),
    courses: getLastCourses(3),
    labels,
  };
};

export default HomePage;
