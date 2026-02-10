import { cors } from "@elysiajs/cors"
import { openapi } from "@elysiajs/openapi"
import { Elysia } from "elysia"

import { healthCheckPlugin } from "@repo/shared-backend/plugins/healthcheck"
import { requestLoggerPlugin } from "@repo/shared-backend/plugins/logger/plugin"
import env from "@/env"
import { logger } from "@/libs/logger"
import { errorHandler } from "@/plugins/error-handler"
import { apiRouter } from "@/routes"

new Elysia()
  .use(cors())
  .use(openapi({ path: "/docs" }))
  .use(errorHandler())
  .use(requestLoggerPlugin(logger))
  .use(healthCheckPlugin())
  .use(apiRouter)
  .listen(env.API_PORT, () => {
    logger.info(`Server is running on http://localhost:${env.API_PORT}`)
  })
