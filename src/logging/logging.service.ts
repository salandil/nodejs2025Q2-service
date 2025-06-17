import { Injectable, LoggerService } from '@nestjs/common';
import { appendFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import {
  LogType,
  LOGS_LOG_FOLDER,
  LogLevel,
  LOGS_MAX_FILE_SIZE,
  LOGS_LOG_LEVEL,
} from './logging.helper';
import { join } from 'node:path';

@Injectable()
export class LoggingService implements LoggerService {
  constructor() {
    this.checkFolder();
  }

  async appendLog(type: LogType, level: LogLevel, message: string) {
    if (level > LOGS_LOG_LEVEL) {
      return;
    }
    const logFilePath = await this.getLogFilePath(type);
    const newLine = `[${LogLevel[level]}] ${new Date().toISOString()} ${message}\n`;
    try {
      await appendFile(logFilePath, newLine, { flag: 'a' });
    } catch (error) {
      throw error;
    }
  }

  async checkFolder() {
    try {
      await mkdir(LOGS_LOG_FOLDER);
    } catch (error) {}
  }

  async getLogFilePath(type: LogType) {
    const logFolderPath = join(LOGS_LOG_FOLDER);
    const logFiles = await readdir(logFolderPath);
    const sorted = logFiles.length
      ? logFiles
          .filter((file) => file.endsWith('.txt') && file.startsWith(type))
          .sort((a, b) => +a.match(/\d+/)[0] - +b.match(/\d+/)[0])
      : undefined;
    const logFileName = sorted ? sorted[sorted.length - 1] : undefined;
    const canAppend = logFileName
      ? await this.checkCanAppend(join(LOGS_LOG_FOLDER, logFileName))
      : false;
    if (!canAppend) {
      const newIndex = logFileName ? logFileName.match(/\d+/)[0] + 1 : 0;
      const newLogFileName = `${type}_${newIndex}.txt`;
      try {
        await writeFile(join(LOGS_LOG_FOLDER, newLogFileName), '', {
          encoding: 'utf-8',
        });
        return join(LOGS_LOG_FOLDER, newLogFileName);
      } catch (error) {
        throw error;
      }
    }
    return join(LOGS_LOG_FOLDER, logFileName);
  }

  async checkCanAppend(path: string) {
    try {
      const stats = await stat(path);
      if (stats.size >= LOGS_MAX_FILE_SIZE) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  error(message: string) {
    this.appendLog(LogType.ERROR, LogLevel.ERROR, message);
  }

  warn(message: string) {
    this.appendLog(LogType.LOG, LogLevel.WARN, message);
  }

  log(message: string) {
    this.appendLog(LogType.LOG, LogLevel.LOG, message);
  }

  debug(message: string) {
    this.appendLog(LogType.LOG, LogLevel.DEBUG, message);
  }

  verbose(message: string) {
    this.appendLog(LogType.LOG, LogLevel.VERBOSE, message);
  }
}
