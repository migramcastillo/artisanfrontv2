import ArtisanFront from '../layouts/ArtisanFront';
import ArticleCard from '../components/ArticleCard/ArticleCard';

const Index = props => {
  return (
    <ArtisanFront>
      <div className="text-center px-2 py-4 bg-white">
        <div className="container mx-auto">
          <h1 className="text-3xl my-2 leading-relaxed text-gray-900 font-bold">
            Doing front end on Laravel will be a pleasure trip
          </h1>
          <p className="my-2 leading-relaxed text-gray-700">
            This is the blog for Laravel developers who want a easy to use guide
            and a cookbook for doing FrontEnd stuff.
          </p>
          <div className="flex items-center justify-around">
            <figure className="flex-1">
              <img
                className="px-4 py-1"
                src="https://raw.githubusercontent.com/webpack/media/master/logo/icon-square-big.png"
              />
            </figure>
            <figure className="flex-1">
              <img
                className="px-4 py-1"
                src="https://carlos-herrera.com/wp-content/uploads/2015/06/1423519219laravel-l-slant.png"
              />
            </figure>
            <figure className="flex-1">
              <img
                className="px-4 py-1"
                src="https://i0.wp.com/courseclub.net/wp-content/uploads/2018/10/65432123.png"
              />
            </figure>
            <figure className="flex-1">
              <img
                className="px-4 py-1"
                src="http://www.stickpng.com/assets/images/5847ea22cef1014c0b5e4833.png"
              />
            </figure>
            <figure className="flex-1">
              <img
                className="px-4 py-1"
                src="https://vuejs.org/images/logo.png"
              />
            </figure>
            <figure className="flex-1">
              <img
                className="px-4 py-1"
                src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
              />
            </figure>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-2">
        <h1 className="text-2xl text-center text-gray-800 font-bold my-4">
          Free full courses
        </h1>
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
        <a
          href="/en/articles"
          className="bg-gray-200 rounded-full text-blue-500 block text-center text-sm p-2"
        >
          View all
        </a>

        <h1 className="text-2xl text-center text-gray-800 font-bold mb-6 mt-12">
          Latest articles
        </h1>
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
        <a
          href="/en/articles"
          className="bg-gray-200 rounded-full text-blue-500 block text-center text-sm p-2"
        >
          View all
        </a>
      </div>
    </ArtisanFront>
  );
};

export default Index;
