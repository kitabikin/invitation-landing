module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    coreURL: process.env.CORE_URL,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
