import ArtisanFront from "../../../layouts/ArtisanFront";

export const CourseIndexPage = ({ courseData, summary, ...props }) => {
  return (
    <ArtisanFront>
      <h1>{courseData.name}</h1>
      {summary.map((lesson) => (
        <div>
          <a href={`/cursos/${courseData.slug}/${lesson.file}`}>
            {lesson.title}
          </a>
        </div>
      ))}
    </ArtisanFront>
  );
};

CourseIndexPage.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { coursename } = query;

  const { default: allCourses } = await import(`../../../courses/list`);

  const courseData = allCourses.find((course) => course.slug === coursename);

  const { default: summary } = await import(
    `../../../courses/${courseData.folder}/list`
  );

  return {
    summary,
    courseData,
  };
};

export default CourseIndexPage;
