/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
  reactStrictMode: true,
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NESTJS_API_URL: process.env.NESTJS_API_URL,
    dotenv: {
      path: "./.env", // Load environment variables from .env file
    },
  },
  eslint: {
    // Enable ESLint support for Babel plugins/presets
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
          },
        ],
      },
    ];
  },
  // Enable support for Next.js pages
  pages: true,
  // Enable support for Next.js API routes
  api: true,
  // Enable support for Next.js internationalized routing
  i18n: true,
};
