import ArtisanFront from "../layouts/ArtisanFront";
import ArticleCard from "../components/ArticleCard/ArticleCard";

const ListArticles = ({ lang, hreflangs, ...props }) => {
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
            placeholder="Search for specific article or tag"
          />
        </form>
        <div className="flex flex-wrap">
          <div className="md:w-1/3 md:px-1">
            <ArticleCard />
          </div>
          <div className="md:w-1/3 md:px-1">
            <ArticleCard />
          </div>
          <div className="md:w-1/3 md:px-1">
            <ArticleCard />
          </div>
          <div className="md:w-1/3 md:px-1">
            <ArticleCard />
          </div>
          <div className="md:w-1/3 md:px-1">
            <ArticleCard />
          </div>
          <div className="md:w-1/3 md:px-1">
            <ArticleCard />
          </div>
        </div>
      </div>
    </ArtisanFront>
  );
};

ListArticles.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: "/es/articulos", en: "/en/articles" }
  };
};

export default ListArticles;
