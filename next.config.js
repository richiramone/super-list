/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['it'],
    defaultLocale: 'it',
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
