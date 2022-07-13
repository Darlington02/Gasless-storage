/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,

  env: {
    BASE_URL: process.env.BASE_URL,
  },

  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },

}

module.exports = nextConfig
