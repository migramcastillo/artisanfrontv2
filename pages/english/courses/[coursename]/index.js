import ArtisanFront from "../../../../layouts/ArtisanFront";
import WithLanguage from "../../../../hoc/with-language";

export const CourseIndexPage = ({
  lang,
  hreflangs,
  courseData,
  summary,
  ...props
}) => {
  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <h1>{courseData.name}</h1>
      {summary.map((lesson) => (
        <div>
          <a
            href={`/${lang === "en" ? "english/courses" : "cursos"}/${
              courseData.slug
            }/${lesson.file}`}
          >
            {lesson.title}
          </a>
        </div>
      ))}
    </ArtisanFront>
  );
};

CourseIndexPage.getInitialProps = async (ctx) => {
  console.log();
  const { lang, query } = ctx;
  const { coursename } = query;

  const { default: allCourses } = await import(
    `../../../../courses/list-${lang}`
  );

  const courseData = allCourses.find((course) => course.slug === coursename);

  const { default: summary } = await import(
    `../../../../courses/${lang}/${courseData.folder}/list`
  );

  return {
    summary,
    courseData,
    hreflangs: { es: "/cursos/", en: "/english/courses/" },
  };
};

export default WithLanguage(CourseIndexPage, "en");
