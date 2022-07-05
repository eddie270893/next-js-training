/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['localhost', 'localhost:5000'],
  },
  async rewrites() {
    return [
      {
        source: '/post-static',
        destination: '/post-static/page/1',
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/about-old',
        destination: '/about',
        permanent: true,
      },
    ]
  },

}

module.exports = nextConfig
