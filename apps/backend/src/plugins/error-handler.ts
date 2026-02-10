import Elysia from "elysia"

import env from "@/env"
import { logger } from "@/libs/logger"

export const errorHandler = () =>
  new Elysia().onError({ as: "global" }, ({ error, code, status }) => {
    switch (code) {
      case "NOT_FOUND": {
        return status(404, { status: 404, message: "Not Found" })
      }
      case "INTERNAL_SERVER_ERROR":
      case "UNKNOWN": {
        logger.error(error)
        return status(500, {
          status: 500,
          message: "Internal Server Error",
          error: env.NODE_ENV === "development" ? error.message : undefined,
        })
      }
    }
  })
