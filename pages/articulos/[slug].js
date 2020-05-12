import Error from "next/error";
import Head from "next/head";
import ArtisanFront from "../../layouts/ArtisanFront";
import CodeBlock from "../../components/CodeBlock";
import {
  getArticleBySlug,
  getArticleDataByKey,
} from "../../helpers/get-articles";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export const ArticlePage = ({ article, markDown }) => {
  if (!article) return <Error status={404} />;

  const components = {
    pre: (props) => <div {...props} />,
    code: CodeBlock,
  };

  return (
    <ArtisanFront>
      <Head>
        <title>{article.title} - Artisan Front</title>
        <meta name="description" content={article.description} />
      </Head>
      <article className="container mx-auto py-4 px-4 sm:px-2 md:px-1 lg:px-0 article">
        <p>Miguel Castillo - 5 Abril 2020</p>
        <ReactMarkdown source={markDown} renderers={components} />
      </article>
    </ArtisanFront>
  );
};

ArticlePage.getInitialProps = async ({ query, res }) => {
  const { slug } = query;

  const article = getArticleBySlug(slug);

  if (!article) {
    res.statusCode = 404;
    return {};
  }

  const { key } = article;

  const articleData = getArticleDataByKey(key);

  const { default: content } = require(`../../articles/${articleData.file}.md`);

  const data = matter(content);

  return {
    article: articleData,
    markDown: data.content,
  };
};

export default ArticlePage;
