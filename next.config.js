/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `@import "variables.scss";`,
    additionalData: `@import "mixin.scss";`,
  },
  output: 'export'
  
};

module.exports = nextConfig
