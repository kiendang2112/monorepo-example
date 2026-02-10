import { Elysia, t } from "elysia"

const SERVICE_START_TIME = new Date()

export interface HealthCheckPluginOptions {
  basePath?: string
}

export function healthCheckPlugin(options: HealthCheckPluginOptions = {}) {
  const basePath = options.basePath ?? "/health"

  return new Elysia({ name: "health-plugin" }).get(
    basePath,
    () => {
      const now = new Date()
      const uptimeMs = now.getTime() - SERVICE_START_TIME.getTime()

      return {
        startedAt: SERVICE_START_TIME.toISOString(),
        uptimeMs,
        serverTime: now.toISOString(),
      } as const
    },
    {
      detail: { summary: "Health check" },

      response: t.Object({
        startedAt: t.String(),
        uptimeMs: t.Number(),
        serverTime: t.String(),
      }),
    },
  )
}

export type HealthResponse = ReturnType<ReturnType<typeof healthCheckPlugin>["get"]>
