export enum LogType {
  ERROR = 'error',
  LOG = 'log',
}

export enum LogLevel {
  LOG = 0,
  ERROR = 1,
  WARN = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

export const LOGS_MAX_FILE_SIZE =
  +(process.env.LOGS_MAX_FILE_SIZE || 256) * 1024;
export const LOGS_LOG_LEVEL = +(process.env.LOGS_LOG_LEVEL || 2);
export const LOGS_LOG_FOLDER = process.env.LOGS_LOG_FOLDER || 'logs';
