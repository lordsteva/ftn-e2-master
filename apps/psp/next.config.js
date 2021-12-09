const withImages = require('next-images');
const withTM = require('next-transpile-modules')(['@team21/ui-components', '@team21/web-shop-front']);

module.exports = withTM({
  ...withImages(),
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
