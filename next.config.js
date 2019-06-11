const withMDX = require("@next/mdx")();
const withCSS = require("@zeit/next-css");

module.exports = withMDX(
  withCSS({
    target: "serverless"
  })
);
