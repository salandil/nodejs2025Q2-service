import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB } = process.env;
const DB_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default new DataSource({
  type: 'postgres',
  url: DB_URL,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['migrations/*.ts'],
});
