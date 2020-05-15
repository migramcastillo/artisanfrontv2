import ArtisanFront from "../../layouts/ArtisanFront";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { getAllArticles } from "../../helpers/get-articles";

const ArticlesMainPage = ({ articles }) => {
  return (
    <ArtisanFront>
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-semibold py-4 text-gray-900 text-center">
          Articulos del blog
        </h1>
        <form className="text-center">
          <input
            className="h-12 p-2 my-2 text-gray-700 rounded lg:w-1/3 w-2/3 shadow"
            type="text"
            placeholder="Busca algún artículo en especifico o tag"
          />
        </form>
        {articles.length === 0 && (
          <p className="text-gray-900 text-lg text-center my-2">
            Aún no hay artículos redactados
          </p>
        )}
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
          {articles.map((art) => {
            return (
              <div className="md:w-1/3 md:px-1" key={art.slug}>
                <ArticleCard data={art} />
              </div>
            );
          })}
        </div>
      </div>
    </ArtisanFront>
  );
};

ArticlesMainPage.getInitialProps = async (ctx) => {
  const articles = getAllArticles();

  return {
    articles,
  };
};

export default ArticlesMainPage;
