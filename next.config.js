/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  // proxy 설정
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'http://localhost:8080/:path*',
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
