import { MDXProvider } from "@mdx-js/react";
import Error from "next/error";
import Head from "next/head";
import ArtisanFront from "../../../../layouts/ArtisanFront";
import CodeBlock from "../../../../components/CodeBlock";
import WithLanguage from "../../../../hoc/with-language";

export const CourseLessonPage = (props) => {
  const { lesson, Content, lang, hreflangs } = props;
  if (!lesson) return <Error status={404} />;

  const components = {
    pre: (props) => <div {...props} />,
    code: CodeBlock,
  };

  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>{lesson.title} - Artisan Front</title>
      </Head>
      <article className="container mx-auto py-4 px-4 sm:px-2 md:px-1 lg:px-0 article">
        <p>Miguel Castillo - 5 Abril 2020</p>
        <MDXProvider components={components}>
          <Content />
        </MDXProvider>
      </article>
    </ArtisanFront>
  );
};

CourseLessonPage.getInitialProps = async ({ query, lang, res }) => {
  let hreflangs = { es: "", en: "" };
  const { coursename, slug } = query;

  const { default: allCourses } = await import(
    `../../../../courses/list-${lang}`
  );
  const courseData = allCourses.find((course) => course.slug === coursename);
  const { default: allLessons } = await import(
    `../../../../courses/${lang}/${courseData.folder}/list`
  );

  const lesson = allLessons.find((les) => les.file === slug);

  if (!lesson) {
    res.statusCode = 404;
    return {
      lang,
    };
  }

  let Content = null;
  if (lesson) {
    Content = await import(
      `../../../../courses/${lang}/${courseData.folder}/${lesson.file}.mdx`
    );
    Content = Content.default;
  }

  if (lang === "es") {
    hreflangs.es = "/cursos/" + slug;
    hreflangs.en = "/english/courses/" + lesson.hreflang;
  } else {
    hreflangs.es = "/cursos/" + lesson.hreflang;
    hreflangs.en = "/english/courses/" + slug;
  }

  return {
    lesson,
    Content,
    lang,
    hreflangs,
  };
};

export default WithLanguage(CourseLessonPage, "en");
