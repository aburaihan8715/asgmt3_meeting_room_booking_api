import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  db_url_local: process.env.DB_URL_LOCAL,
  db_url_atlas: process.env.DB_URL_ATLAS,
};
