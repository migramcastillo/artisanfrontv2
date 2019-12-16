import ArtisanFront from "../../../layouts/ArtisanFront";
import ArticleCard from "../../../components/ArticleCard/ArticleCard";
import WithLanguage from "../../../hoc/with-language";
import { getAllArticles } from "../../../helpers/get-articles";

export const ArticlesMainPage = ({ lang, hreflangs, articles, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <div className="container mx-auto py-2">
        <h1 className="text-2xl font-semibold py-4 text-gray-900 text-center">
          {lang === "es" ? "Articulos del blog" : "All articles"}
        </h1>
        <form className="text-center">
          <input
            className="h-12 p-2 my-2 text-gray-700 rounded w-1/3 shadow"
            type="text"
            placeholder={
              lang === "es"
                ? "Busca algún artículo en especifico o tag"
                : "Search for specific article or tag"
            }
          />
        </form>
        <div className="flex flex-wrap">
          {articles.map((art, index) => {
            return (
              <div className="md:w-1/3 md:px-1">
                <ArticleCard data={art} />
              </div>
            );
          })}
        </div>
      </div>
    </ArtisanFront>
  );
};

ArticlesMainPage.getInitialProps = async ctx => {
  const { lang } = ctx;

  const articles = getAllArticles(lang);

  return {
    articles,
    hreflangs: { es: "/articulos", en: "/english/articles" }
  };
};

export default WithLanguage(ArticlesMainPage, "en");
