const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./components/**/*.jsx", "./pages/**/*.js"],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
});

module.exports = {
  plugins: ["postcss-import", "tailwindcss", "autoprefixer"],
};
