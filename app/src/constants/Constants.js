const Constants = {
  API_PORT: process.env.API_PORT || 3000,
  HOSTNAME: process.env.HOSTNAME || 'localhost',
  VALID_NAME_SCHEMA: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g
}

export default Constants;