/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/:project', // e.g. /calculator-one
        destination: '/projects-live/:project/index.html',
      },
    ];
  },
};

module.exports = nextConfig;
