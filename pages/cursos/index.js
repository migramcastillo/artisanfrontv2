import ArtisanFront from "../../layouts/ArtisanFront";
import allCourses from "../../courses/list";

const ListCoursesPage = ({ lang, hreflangs, courses, ...props }) => {
  return (
    <ArtisanFront>
      <h1>Cursos disponibles</h1>
      {courses.map((course) => (
        <div>
          <a href={`/cursos/${course.slug}`}>{course.name}</a>
        </div>
      ))}
    </ArtisanFront>
  );
};

ListCoursesPage.getInitialProps = async (ctx) => {
  return {
    courses: allCourses,
  };
};

export default ListCoursesPage;
