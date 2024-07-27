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
  // Enable support for Next.js pages
  pages: true,
  // Enable support for Next.js API routes
  api: true,
  // Enable support for Next.js internationalized routing
  i18n: true,  
};
