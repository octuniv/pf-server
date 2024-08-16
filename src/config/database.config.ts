import { registerAs } from '@nestjs/config';

// make .env and input dbConfig
export default registerAs('database', () => ({
  username: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dbname: process.env.DATABASE_DBNAME,
  password: process.env.DATABASE_PASSWORD,
}));
