import { Component } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Error from "./_error";
import relation from "../articles/relation.json";
import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "../components/CodeBlock";

class ArticlePage extends Component {
  static async getInitialProps({ query, res }) {
    const isServer = typeof window === "undefined";

    const { name, lang } = query;

    const article = relation[lang][name];

    if (!article && res) res.statusCode = 404;

    let Content = null;
    if (article) {
      Content = await import(`../articles/${lang}/${name}.mdx`);
      Content = Content.default;
    }

    return {
      isServer,
      name,
      article,
      Content
    };
  }

  render() {
    const { article, Content } = this.props;
    if (!article) return <Error status={404} />;

    const components = {
      pre: props => <div {...props} />,
      code: CodeBlock
    };

    return (
      <main>
        <Header />
        <section>
          <p>
            This is another page of the SSR example, you accessed it
            {" " + this.props.name}
            <strong>{this.props.isServer ? "server" : "client"} side</strong>.
          </p>
          <p>You can reload to see how the page change.</p>
          <Link href="/">
            <a>Go to Home</a>
          </Link>
          <MDXProvider components={components}>
            <Content />
          </MDXProvider>
        </section>
      </main>
    );
  }
}

export default ArticlePage;
