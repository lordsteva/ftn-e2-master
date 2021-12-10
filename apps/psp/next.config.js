const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['@team21/ui-components']);

module.exports = withTM({
  ...withImages(),
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
