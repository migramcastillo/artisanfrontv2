import ArtisanFront from '../layouts/ArtisanFront';

const ListArticles = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>List of articles</p>
    </ArtisanFront>
  );
};

ListArticles.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: '/es/articulos/', en: '/en/articles/' }
  };
};

export default ListArticles;
