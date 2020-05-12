import { MDXProvider } from "@mdx-js/react";
import CodeBlock from "./CodeBlock";

const components = {
  pre: (props) => <div {...props} />,
  code: CodeBlock,
};

const CodePageWrapper = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default CodePageWrapper;
