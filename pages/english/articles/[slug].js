import { MDXProvider } from "@mdx-js/react";
import Error from "next/error";
import Head from "next/head";
import ArtisanFront from "../../../layouts/ArtisanFront";
import relation from "../../../articles/relation";
import CodeBlock from "../../../components/CodeBlock";
import WithLanguage from "../../../hoc/with-language";
import {
  getArticleBySlug,
  getArticleDataByKey,
} from "../../../helpers/get-articles";

export const ArticlePage = (props) => {
  const { article, Content, lang, hreflangs } = props;
  if (!article) return <Error status={404} />;

  const components = {
    pre: (props) => <div {...props} />,
    code: CodeBlock,
  };

  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>{article.title} - Artisan Front</title>
        <meta name="description" content={article.description} />
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

ArticlePage.getInitialProps = async ({ query, lang, res }) => {
  let hreflangs = { es: "", en: "" };
  const { slug } = query;

  const article = getArticleBySlug(slug);

  if (!article) {
    res.statusCode = 404;
    return {
      lang,
    };
  }

  const { key } = article;

  const articleData = getArticleDataByKey(key, lang);

  let Content = null;
  if (article) {
    Content = await import(`../../../articles/${lang}/${articleData.file}.mdx`);
    Content = Content.default;
  }

  if (lang === "es") {
    hreflangs.es = "/articulos/" + slug;
    hreflangs.en = "/english/articles/" + articleData.hreflang;
  } else {
    hreflangs.es = "/articulos/" + articleData.hreflang;
    hreflangs.en = "/english/articles/" + slug;
  }

  return {
    article: articleData,
    Content,
    lang,
    hreflangs,
  };
};

export default WithLanguage(ArticlePage, "en");
