import Error from "next/error";
import Head from "next/head";
import Link from "next/link";
import dayjs from "dayjs";
import ArtisanFront from "../../../layouts/ArtisanFront";
import CodeBlock from "../../../components/CodeBlock";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LessonNavigation from "../../../components/LessonNavigation/LessonNavigation";
import allCourses from "../../../courses/list";

const CourseLessonPage = ({
  lesson,
  markDown,
  courseData,
  prevLesson,
  nextLesson,
}) => {
  if (!lesson) return <Error status={404} />;

  const components = {
    pre: (props) => <div {...props} />,
    code: CodeBlock,
    link: (props) => {
      return <a {...props} className="text-blue-800" />;
    },
  };

  return (
    <ArtisanFront>
      <Head>
        <title>
          {lesson.title} - {courseData.title}
        </title>
        <meta name="description" content={lesson.description} />
        <meta
          property="og:url"
          content={`https://www.artisanfront.com/cursos/${courseData.slug}/${lesson.file}`}
        />
        <meta property="og:title" content={`${lesson.title} - Artisan Front`} />
        <meta property="og:description" content={lesson.description} />
        <meta property="og:image" content={`/${courseData.bgImage}`} />
      </Head>
      <article className="container mx-auto py-4 px-4 sm:px-2 md:px-1 lg:px-0 article">
        <p>
          {courseData.author} -{" "}
          {dayjs(courseData.timestamp).format("DD MMM YYYY")}
        </p>
        <div className="flex">
          {lesson.github && (
            <a href={lesson.github}>
              <div className="bg-gray-900 text-white rounded shadow py-2 px-3 text-sm mr-2">
                <FontAwesomeIcon icon={["fab", "github"]} /> Código de está
                lección
              </div>
            </a>
          )}
          {lesson.video && (
            <a href={lesson.video}>
              <div className="bg-red-600 text-white rounded shadow py-2 px-3 text-sm mr-2">
                <FontAwesomeIcon icon={["fab", "youtube"]} /> Videotutorial
              </div>
            </a>
          )}
          <Link as={`/cursos/${courseData.slug}`} href="/cursos/[coursename]">
            <a>
              <div className="bg-blue-600 text-white rounded shadow py-2 px-3 text-sm">
                <FontAwesomeIcon icon="graduation-cap" /> Indice del curso
              </div>
            </a>
          </Link>
        </div>
        <ReactMarkdown source={markDown} renderers={components} />
        <LessonNavigation
          courseTitle={courseData.title}
          courseSlug={courseData.slug}
          prevLesson={prevLesson}
          nextLesson={nextLesson}
        />
      </article>
    </ArtisanFront>
  );
};

CourseLessonPage.getInitialProps = async ({ query, res }) => {
  const { coursename, slug } = query;

  const courseData = allCourses.find((course) => course.slug === coursename);
  const { default: allLessons } = await import(
    `../../../courses/${courseData.folder}/list`
  );

  const lesson = allLessons.find((les) => les.file === slug);
  const lessonIndex = allLessons.findIndex((les) => les.file === slug);

  if (!lesson) {
    res.statusCode = 404;
    return {};
  }

  const {
    default: content,
  } = await require(`../../../courses/${courseData.folder}/${lesson.file}.md`);

  const prevLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson =
    lessonIndex >= allLessons.length - 1 ? null : allLessons[lessonIndex + 1];

  return {
    lesson,
    markDown: content,
    courseData,
    prevLesson,
    nextLesson,
  };
};

export default CourseLessonPage;
