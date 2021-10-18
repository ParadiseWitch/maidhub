const fs = require('fs')
import { writeFileSync } from 'fs'
import { dateFormat } from './DateUtil'

export default class Log {
  private static logPath = './log/';
  private static logName = 'log.txt';
  public static log(...contents: string[]) {
    Log.writeLogFile("info", ...contents);
  }
  public static debug(...contents: string[]) {
    Log.writeLogFile("debug", ...contents);
  }
  public static error(...contents: string[]) {
    Log.writeLogFile("error", ...contents);
  }
  public static warn(...contents: string[]) {
    Log.writeLogFile("warn", ...contents);
  }
  public static info(...contents: string[]) {
    Log.writeLogFile("warn");
  }

  public static writeLogFile(level: string, ...contents: string[]) {
    const logFilePath = this.logPath + this.logName;
    const now = dateFormat(new Date());
    const newLine = `[${level}]\t${now}\t${contents.join(", ")}\n`;
    const data = fs.readFileSync(logFilePath);
    fs.writeFileSync(logFilePath, data + newLine)
  }
}


