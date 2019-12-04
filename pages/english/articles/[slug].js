import { MDXProvider } from "@mdx-js/react";
import Error from "next/error";
import Head from "next/head";
import ArtisanFront from "../../../layouts/ArtisanFront";
import relation from "../../../articles/relation";
import CodeBlock from "../../../components/CodeBlock";
import WithLanguage from "../../../hoc/with-language";

export const ArticlePage = props => {
  const { article, Content, lang, hreflangs } = props;
  if (!article) return <Error status={404} />;

  const components = {
    pre: props => <div {...props} />,
    code: CodeBlock
  };

  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <Head>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
      </Head>
      <article className="container mx-auto py-4 article">
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

  const article = relation[lang][slug];

  if (!article && res) {
    res.statusCode = 404;
    return {
      lang
    };
  }

  let Content = null;
  if (article) {
    Content = await import(`../../../articles/${lang}/${slug}.mdx`);
    Content = Content.default;
  }

  if (lang === "es") {
    hreflangs.es = "/articulos/" + slug;
    hreflangs.en = "/english/articles/" + article.hreflang;
  } else {
    hreflangs.es = "/articulos/" + article.hreflang;
    hreflangs.en = "/english/articles/" + slug;
  }

  return {
    article,
    Content,
    lang,
    hreflangs
  };
};

export default WithLanguage(ArticlePage, "en");
