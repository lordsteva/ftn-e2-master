const config = {
  PORT: process.env.PORT || 1235,
  HASURA_ADMIN_SECRET_HEADER_NAME: process.env.HASURA_ADMIN_SECRET_HEADER_NAME,
  HGE_ADMIN_SECRET: process.env.HGE_ADMIN_SECRET,
  HGE_ENDPOINT: process.env.HGE_ENDPOINT,
  APP_ID: process.env.APP_ID,
  HOST_ADDRESS: process.env.NEXT_PUBLIC_HOST_ADDRESS,
};

export default config;
