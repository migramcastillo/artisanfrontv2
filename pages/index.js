import Head from "next/head";
import ArtisanFront from "../layouts/ArtisanFront";
import HomeArticles from "../components/HomeArticles/HomeArticles";
import WithLanguage from "../hoc/with-language";
import ViewAllButton from "../components/view-all-button";
import NextDocsButton from "../components/next-docs-button/next-docs-button";
import { getLastArticles } from "../helpers/get-articles";
import i18n from "../locales/home.i18n";

export const HomePage = ({ lang, labels, hreflangs, articles, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>Artisan Front - {labels.title}</title>
        <meta name="description" content={labels.description} />
      </Head>
      <div className="container mx-auto p-2">
        <h1 className="text-center text-3xl font-semibold text-gray-900 my-4">
          {labels.h1}
        </h1>
        {lang === "es" && (
          <div className="text-center py-4">
            <NextDocsButton />
          </div>
        )}
        <h2 className="text-2xl text-center text-gray-800 font-semibold my-2">
          {labels.h2Courses}
        </h2>
        <HomeArticles articles={articles} />
        <ViewAllButton
          lang={lang}
          href={lang === "es" ? "/cursos" : "/english/courses"}
        />

        <h2 className="text-2xl text-center text-gray-800 font-bold mb-6 mt-12">
          {labels.h2Articles}
        </h2>
        <HomeArticles articles={articles} />
        <ViewAllButton
          lang={lang}
          href={lang === "es" ? "/articulos" : "/english/articles"}
        />
      </div>
    </ArtisanFront>
  );
};

HomePage.getInitialProps = async ctx => {
  const { lang } = ctx;

  const data = getLastArticles(3, lang);
  const labels = i18n[lang] || i18n.es;

  return {
    articles: data,
    labels,
    hreflangs: { es: "/", en: "/english" }
  };
};

export default WithLanguage(HomePage, "es");
