import * as dotenv from "dotenv";

dotenv.config();

const config = {
  ARGON2ID_SALT: process.env.ARGON2ID_SALT,
  PORT: process.env.PORT || 3000,
};

export default config;
