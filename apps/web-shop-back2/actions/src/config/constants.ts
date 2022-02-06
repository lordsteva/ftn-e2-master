const config = {
  PORT: process.env.PORT || 8080,
  HASURA_ADMIN_SECRET_HEADER_NAME: process.env.HASURA_ADMIN_SECRET_HEADER_NAME,
  HGE_ADMIN_SECRET: process.env.HGE_ADMIN_SECRET,
  HGE_ENDPOINT: process.env.HGE_ENDPOINT,
  TOKEN_KEY: process.env.TOKEN_KEY,
  PSP_ENDPOINT: process.env.PSP_ENDPOINT,
  PSP_API_KEY: process.env.PSP_API_KEY,
  PSP_API_SERET: process.env.PSP_API_SECRET,
  PSP_KEY_HEADER: process.env.PSP_KEY_HEADER,
  PSP_SECRET_HEADER: process.env.PSP_SECRET_HEADER,
  API_KEY_WAGE: process.env.API_KEY_WAGE,
  API_SECRET_WAGE: process.env.API_SECRET_WAGE,
};

export default config;
