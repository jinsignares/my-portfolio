/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.app.goo.gl', 'www.freepnglogos.com'],
  }
}

module.exports = nextConfig
