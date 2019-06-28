import { Component } from "react";
import ArtisanFront from "../layouts/ArtisanFront";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import Header from "../components/Header";
import Error from "./_error";
import relation from "../articles/relation.json";
import CodeBlock from "../components/CodeBlock";

const ArticlePage = props => {
  const { article, Content, lang, hreflangs } = props;
  if (!article) return <Error status={404} />;

  const components = {
    pre: props => <div {...props} />,
    code: CodeBlock
  };

  return (
    <ArtisanFront lang={lang} hreflangs={hreflangs}>
      <article className="container mx-auto py-4 article">
        <MDXProvider components={components}>
          <Content />
        </MDXProvider>
      </article>
    </ArtisanFront>
  );
};

ArticlePage.getInitialProps = async ({ query, res }) => {
  const { name, lang } = query;

  const article = relation[lang][name];

  if (!article && res) res.statusCode = 404;

  let Content = null;
  if (article) {
    Content = await import(`../articles/${lang}/${name}.mdx`);
    Content = Content.default;
  }

  let hreflangs = { es: "", en: "" };
  if (lang === "es") {
    hreflangs.es = "/es/articulos/" + name;
    hreflangs.en = "/en/articles/" + article.hreflang;
  } else {
    hreflangs.es = "/es/articulos/" + article.hreflang;
    hreflangs.en = "/en/articles/" + name;
  }

  return {
    name,
    article,
    Content,
    lang,
    hreflangs
  };
};

export default ArticlePage;
