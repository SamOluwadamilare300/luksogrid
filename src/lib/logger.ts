type LogLevel = "debug" | "info" | "warn" | "error"

class Logger {
  private level: LogLevel = "info"

  setLevel(level: LogLevel) {
    this.level = level
  }

  debug(message: string, ...args: any[]) {
    if (this.shouldLog("debug")) {
      console.debug(`[DEBUG] ${message}`, ...args)
    }
  }

  info(message: string, ...args: any[]) {
    if (this.shouldLog("info")) {
      console.info(`[INFO] ${message}`, ...args)
    }
  }

  warn(message: string, ...args: any[]) {
    if (this.shouldLog("warn")) {
      console.warn(`[WARN] ${message}`, ...args)
    }
  }

  error(message: string, error?: Error, ...args: any[]) {
    if (this.shouldLog("error")) {
      console.error(`[ERROR] ${message}`, error, ...args)
    }
  }

  private shouldLog(messageLevel: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    }

    return levels[messageLevel] >= levels[this.level]
  }
}

export const logger = new Logger()
