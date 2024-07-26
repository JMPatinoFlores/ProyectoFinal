/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  reactStrictMode: true,
  env: {
    dotenv: {
      path: './.env', // Load environment variables from .env file
    },
  },
  eslint: {
    // Enable ESLint support for Babel plugins/presets
    ignoreDuringBuilds: true,
  },
};
