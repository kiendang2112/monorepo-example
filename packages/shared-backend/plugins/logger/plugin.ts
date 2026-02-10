import { Elysia } from "elysia"
import type pino from "pino"

export interface LoggerPluginOptions {
  name?: string
  pretty?: boolean
  logErrors?: boolean
  enabled?: boolean
  includeStack?: boolean
}

interface RequestWithMetadata extends Request {
  __requestId?: string
  __startTime?: number
}

const formatDuration = (ms: number): string => {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}μs`
  if (ms < 1000) return `${ms.toFixed(1)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

const generateRequestId = (): string => {
  return Math.random().toString(36).slice(2, 15)
}

export const requestLoggerPlugin = (logger: pino.Logger, opts: LoggerPluginOptions = {}) => {
  const enabled = opts.enabled ?? true
  if (!enabled) {
    return new Elysia({ name: "logger-plugin" })
  }

  return new Elysia({ name: "logger-plugin" })
    .onRequest(({ request }) => {
      const requestId = generateRequestId()
      const startTime = performance.now()
      const reqWithMeta = request as RequestWithMetadata
      reqWithMeta.__requestId = requestId
      reqWithMeta.__startTime = startTime
    })
    .onAfterHandle({ as: "global" }, ({ request, set, responseValue }) => {
      const url = new URL(request.url)
      const status = typeof set.status === "number" ? set.status : 200
      const reqWithMeta = request as RequestWithMetadata
      const startTime = reqWithMeta.__startTime
      const duration = startTime ? performance.now() - startTime : 0
      const durationStr = formatDuration(duration)

      if (status >= 400) {
        const resAny = responseValue as { summary?: string; message?: string } | undefined
        const msg = resAny?.summary ?? resAny?.message ?? String(resAny ?? "")

        const logMessage = `${request.method} ${url.pathname} ${status} ${durationStr} msg: ${msg}`

        if (status >= 500) {
          logger.error(logMessage)
        } else {
          logger.warn(logMessage)
        }
      } else {
        logger.info(`${request.method} ${url.pathname} ${status} ${durationStr}`)
      }
    })
}
