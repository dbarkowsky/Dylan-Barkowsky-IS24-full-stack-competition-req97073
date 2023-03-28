const Constants = {
  API_PORT: process.env.API_PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  VALID_NAME_SCHEMA: /^[a-zA-Z]{2,}(([',. -][a-zA-Z ])?[a-zA-Z ]*)*$/g,
  VALID_PRODUCT_NAME_SCHEMA: /^[a-zA-Z0-9]{2,}(([',. -][a-zA-Z0-9 ])?[a-zA-Z0-9 ]*)*$/g
}

export default Constants;
