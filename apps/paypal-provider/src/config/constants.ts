const config = {
  PORT: process.env.PORT || 1234,
  HASURA_ADMIN_SECRET_HEADER_NAME: process.env.HASURA_ADMIN_SECRET_HEADER_NAME,
  HGE_ADMIN_SECRET: process.env.HGE_ADMIN_SECRET,
  HGE_ENDPOINT: process.env.HGE_ENDPOINT,
  APP_ID: process.env.APP_ID,
  HOST_ADDRESS: process.env.NEXT_PUBLIC_HOST_ADDRESS,
  PAY_PAL_BASE_URL: process.env.PAY_PAL_BASE_URL,
};

export default config;
