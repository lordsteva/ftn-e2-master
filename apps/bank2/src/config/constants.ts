const config = {
  PORT: process.env.PORT || 9999,
  HASURA_ADMIN_SECRET_HEADER_NAME: process.env.HASURA_ADMIN_SECRET_HEADER_NAME,
  HGE_ADMIN_SECRET: process.env.HGE_ADMIN_SECRET,
  TOKEN_KEY: process.env.TOKEN_KEY,
  HGE_ENDPOINT: process.env.NEXT_PUBLIC_HGE_ENDPOINT,
  HOST_ADDRESS: process.env.NEXT_PUBLIC_HOST_ADDRESS,
};

export default config;
