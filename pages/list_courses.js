import ArtisanFront from '../layouts/ArtisanFront';

const ListCourses = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>List of courses</p>
    </ArtisanFront>
  );
};

ListCourses.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: '/es/cursos/', en: '/en/courses/' }
  };
};

export default ListCourses;
