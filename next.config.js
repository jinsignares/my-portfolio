/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.freepnglogos.com', 'i.imgur.com'],
  }
}

module.exports = nextConfig
