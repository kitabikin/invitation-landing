const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'ik.imagekit.io',
      'api.dicebear.com',
      'placehold.co',
      'images.unsplash.com',
    ],
  },
  experimental: {
    nextScriptWorkers: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
