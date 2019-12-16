import ArticleCard from "../ArticleCard/ArticleCard";

const HomeArticles = ({ articles }) => {
  const articlesArray = Array.from(articles);
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
      {articlesArray.map((article, index) => (
        <div key={index} className="md:w-1/3 md:px-1">
          <ArticleCard data={article} />
        </div>
      ))}
    </div>
  );
};

export default HomeArticles;
