const isProd = (process.env.NODE_ENV || "production") === "production";
const assetPrefix = isProd ? "https://contents.kepler-452b.net" : "";

module.exports = {
  assetPrefix: assetPrefix,
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
