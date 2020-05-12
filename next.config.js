const withMDX = require("@next/mdx")();

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx"],
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
});
