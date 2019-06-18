import ArtisanFront from '../layouts/ArtisanFront';

const Course = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>Course section</p>
    </ArtisanFront>
  );
};

Course.getInitialProps = async ({ query, res }) => {
  const { lang } = query;

  return {
    lang,
    hreflangs: { es: '/es/cursos/', en: '/en/courses/' }
  };
};

export default Course;
