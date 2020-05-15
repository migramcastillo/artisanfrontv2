import ArtisanFront from "../../../layouts/ArtisanFront";
import { getCourseBySlug } from "../../../helpers/get-courses";
import CardLesson from "../../../components/CardLesson/CardLesson";
import Head from "next/head";

export const CourseIndexPage = ({ courseData, lessonsList }) => {
  return (
    <ArtisanFront>
      <Head>
        <title>{courseData.title} - Artisan Front</title>
        <meta name="description" content={courseData.description} />
        <meta
          property="og:url"
          content={`https://www.artisanfront.com/cursos/${courseData.slug}`}
        />
        <meta
          property="og:title"
          content={`${courseData.title} - Artisan Front`}
        />
        <meta property="og:description" content={courseData.description} />
        <meta property="og:image" content={`/${courseData.bgImage}`} />
      </Head>
      <div className="container mx-auto p-2">
        <h1 className="text-2xl font-semibold py-4 text-gray-900 text-center">
          {courseData.title}
        </h1>
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
          {Array.from(lessonsList).map((lesson, index) => (
            <div key={index} className="md:w-1/3 md:px-1">
              <CardLesson data={lesson} />
            </div>
          ))}
        </div>
      </div>
    </ArtisanFront>
  );
};

CourseIndexPage.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { coursename } = query;

  const courseData = getCourseBySlug(coursename);
  const { default: courseLessonsList } = await import(
    `../../../courses/${courseData.folder}/list`
  );

  const lessonsList = courseLessonsList.map((lesson) => ({
    ...lesson,
    bgImage: courseData.bgImage,
    author: courseData.author,
    timestamp: courseData.timestamp,
    courseSlug: courseData.slug,
    description: "",
  }));

  return {
    lessonsList,
    courseData,
  };
};

export default CourseIndexPage;
