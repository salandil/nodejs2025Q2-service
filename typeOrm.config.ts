import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();
const { DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const DB_URL = `postgresql://${DB_NAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default new DataSource({
  type: 'postgres',
  url: DB_URL,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.ts'],
});
