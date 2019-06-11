import ArtisanFront from "../layouts/ArtisanFront";
import ArticleCard from "../components/ArticleCard/ArticleCard";

const Index = props => {
  return (
    <ArtisanFront>
      <div className="px-2 py-4 bg-white">
        <h1 className="text-2xl my-2 leading-relaxed text-gray-900 font-bold">
          Because sometimes the documentation is not enough...
        </h1>
        <p className="my-2 leading-relaxed">
          This is the blog for developers who doesn't want to read complex
          documentations.
        </p>
      </div>
      <div className="container mx-auto p-2">
        <h1 className="text-xl text-gray-800 font-bold my-4">
          Free full courses
        </h1>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />

        <h1 className="text-xl text-gray-800 font-bold my-4">
          Latest articles
        </h1>
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </ArtisanFront>
  );
};

export default Index;
