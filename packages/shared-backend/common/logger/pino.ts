import pino, {
  type LevelWithSilent,
  type LoggerOptions,
  type Logger as PinoLogger,
  type TransportSingleOptions,
} from "pino"

export interface LoggerConfig {
  name?: string
  level?: LevelWithSilent
  bindings?: Record<string, unknown>
  options?: LoggerOptions
  pretty?: boolean
  loki?: string
}

const prettyTransport: TransportSingleOptions = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
    singleLine: true,
    messageFormat: "{logger} | {msg}", // Move logger name here for pretty print only
  },
}

export class Logger {
  private readonly logger: PinoLogger

  constructor(private readonly config: LoggerConfig) {
    const targets: TransportSingleOptions[] = []

    if (this.config.pretty) {
      targets.push(prettyTransport)
    }

    if (this.config.loki) {
      targets.push({
        target: "pino-loki",
        options: {
          url: this.config.loki,
        },
      })
    }

    this.logger = pino({
      ...this.config.options,
      transport: {
        targets,
      },
    })
  }

  getModuleLogger(module: string, component: string, config: LoggerConfig = {}): PinoLogger {
    return this.buildLogger(`${module}:${component}`, config)
  }

  buildLogger(name: string, config?: LoggerConfig): PinoLogger {
    return this.logger.child({
      logger: name,
      ...config?.bindings,
    })
  }

  error(msg: string, args?: Record<string, unknown>, config?: LoggerConfig): void {
    this.buildLogger("ERROR", config).error({ ...args }, msg)
  }

  warn(msg: string, args?: Record<string, unknown>, config?: LoggerConfig): void {
    this.buildLogger("WARN", config).warn({ ...args }, msg)
  }

  info(msg: string, args?: Record<string, unknown>, config?: LoggerConfig): void {
    this.buildLogger("INFO", config).info({ ...args }, msg)
  }

  debug(msg: string, args?: Record<string, unknown>, config?: LoggerConfig): void {
    this.buildLogger("DEBUG", config).debug({ ...args }, msg)
  }

  trace(msg: string, args?: Record<string, unknown>, config?: LoggerConfig): void {
    this.buildLogger("TRACE", config).trace({ ...args }, msg)
  }
}
