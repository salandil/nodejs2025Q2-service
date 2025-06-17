import { config } from 'dotenv';

config();

export enum LogType {
  ERROR = 'error',
  LOG = 'log',
}

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  LOG = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

export const LOGS_MAX_FILE_SIZE =
  +(process.env.LOGS_MAX_FILE_SIZE || 256) * 1024;
export const LOGS_LOG_LEVEL =
  process.env.LOGS_LOG_LEVEL !== undefined
    ? +process.env.LOGS_LOG_LEVEL
    : LogLevel.LOG;
console.log(LOGS_LOG_LEVEL);
export const LOGS_LOG_FOLDER = process.env.LOGS_LOG_FOLDER || 'logs';
