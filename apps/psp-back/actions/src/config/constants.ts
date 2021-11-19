const config = {
  PORT: process.env.PORT || 8080,
  HASURA_ADMIN_SECRET_HEADER_NAME: process.env.HASURA_ADMIN_SECRET_HEADER_NAME,
  HGE_ADMIN_SECRET: process.env.HGE_ADMIN_SECRET,
  HGE_ENDPOINT: process.env.HGE_ENDPOINT,
};

export default config;
