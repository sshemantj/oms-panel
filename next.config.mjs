/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com"],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
};

export default nextConfig;
