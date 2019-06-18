import ArticleCard from '../ArticleCard/ArticleCard';

const HomeArticles = () => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between">
      <div className="md:w-1/2 md:px-1">
        <ArticleCard />
      </div>
      <div className="md:w-1/2 md:px-1">
        <ArticleCard />
      </div>
      <div className="md:flex-1 md:px-1">
        <ArticleCard />
      </div>
    </div>
  );
};

export default HomeArticles;
