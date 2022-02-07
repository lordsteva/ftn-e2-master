const withImages = require('next-images');
const withTM = require('next-transpile-modules')([]);

module.exports = withTM({
  ...withImages(),
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
