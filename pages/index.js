import ArtisanFront from '../layouts/ArtisanFront';
import HomeArticles from '../components/HomeArticles/HomeArticles';
import HomeButton from '../components/HomeButton/HomeButton';
import HomeIntro from '../components/HomeIntro/HomeIntro';

const Index = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <div className="text-center px-2 py-4 bg-white">
        <HomeIntro lang={lang} />
      </div>
      <div className="container mx-auto p-2">
        <h1 className="text-2xl text-center text-gray-800 font-bold my-4">
          Free full courses
        </h1>
        <HomeArticles />
        <HomeButton />

        <h1 className="text-2xl text-center text-gray-800 font-bold mb-6 mt-12">
          Latest articles
        </h1>
        <HomeArticles />
        <HomeButton />
      </div>
    </ArtisanFront>
  );
};

Index.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: '/es/', en: '/en/' }
  };
};

export default Index;
