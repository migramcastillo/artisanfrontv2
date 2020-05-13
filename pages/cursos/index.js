import ArtisanFront from "../../layouts/ArtisanFront";
import HomeListing from "../../components/HomeListing/HomeListing";
import { getAllCourses } from "../../helpers/get-courses";

const ListCoursesPage = ({ courses }) => {
  return (
    <ArtisanFront>
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-semibold py-4 text-gray-900 text-center">
          Cursos gratuitos de desarrollo web
        </h1>
        {/* <form className="text-center">
          <input
            className="h-12 p-2 my-2 text-gray-700 rounded w-1/3 shadow"
            type="text"
            placeholder="Busca algún artículo en especifico o tag"
          />
        </form> */}
        <HomeListing listing={courses} kind="course" />
      </div>
    </ArtisanFront>
  );
};

ListCoursesPage.getInitialProps = async (ctx) => {
  const courses = getAllCourses();
  return {
    courses,
  };
};

export default ListCoursesPage;
