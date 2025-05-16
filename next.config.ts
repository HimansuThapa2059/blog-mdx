import mdx from "@next/mdx";
const withMDX = mdx({
  extension: /\.mdx?$/,
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
};

module.exports = withMDX(nextConfig);
