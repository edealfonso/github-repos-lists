/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_AUTH_KEY: process.env.GITHUB_AUTH_KEY,
  },
};

module.exports = nextConfig;
