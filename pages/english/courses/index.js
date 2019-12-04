import ArtisanFront from "../../../layouts/ArtisanFront";
import WithLanguage from "../../../hoc/with-language";

export const ListCoursesPage = ({ lang, hreflangs, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <p>List of courses</p>
    </ArtisanFront>
  );
};

ListCoursesPage.getInitialProps = async ctx => {
  return {
    hreflangs: { es: "/cursos/", en: "/english/courses/" }
  };
};

export default WithLanguage(ListCoursesPage, "en");
