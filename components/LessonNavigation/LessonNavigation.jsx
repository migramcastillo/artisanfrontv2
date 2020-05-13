import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LessonNavigation = ({
  courseTitle,
  courseSlug,
  prevLesson,
  nextLesson,
}) => {
  return (
    <div className="py-4">
      <h3 className="font-semibold text-gray-800 text-xl text-center">
        {courseTitle}
      </h3>
      <div className="flex items-center justify-between md:flex-row flex-col">
        {prevLesson ? (
          <Link
            href="/cursos/[coursename]/[slug]"
            as={`/cursos/${courseSlug}/${prevLesson.file}`}
          >
            <a className="bg-white shadow rounded-full px-3 py-2 my-2 md:my-0 text-blue-700">
              <FontAwesomeIcon icon="chevron-left" />
              <span className="ml-1">{prevLesson.title}</span>
            </a>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link
            href="/cursos/[coursename]/[slug]"
            as={`/cursos/${courseSlug}/${nextLesson.file}`}
          >
            <a className="bg-white shadow rounded-full px-3 py-2 my-2 md:my-0 text-blue-700">
              <span className="mr-1">{nextLesson.title}</span>
              <FontAwesomeIcon icon="chevron-right" />
            </a>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default LessonNavigation;
