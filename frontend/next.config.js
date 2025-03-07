/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'de',
  },
  images: {
    loader: 'default',
    // domains: ['localhost','thealchemist.s3.eu-west-2.amazonaws.com','server.thealchemist.de'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/uploads/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'mybabymademedoit.com',
      //   port: '',
      //   pathname: '/uploads/**',
      // },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dsbydh14y/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'thealchemist.s3.eu-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'server.thealchemist.de',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

module.exports = nextConfig;
