import ArtisanFront from "../../../layouts/ArtisanFront";
import WithLanguage from "../../../hoc/with-language";

export const ListCoursesPage = ({ lang, hreflangs, courses, ...props }) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <h1>Cursos disponibles</h1>
      {courses.map((course) => (
        <div>
          <a
            href={`/${lang === "en" ? "english/courses" : "cursos"}/${
              course.slug
            }`}
          >
            {course.name}
          </a>
        </div>
      ))}
    </ArtisanFront>
  );
};

ListCoursesPage.getInitialProps = async (ctx) => {
  const { lang } = ctx;

  const { default: allCourses } = await import(
    `../../../courses/list-${lang}.js`
  );

  return {
    hreflangs: { es: "/cursos/", en: "/english/courses/" },
    courses: allCourses,
  };
};

export default WithLanguage(ListCoursesPage, "en");
