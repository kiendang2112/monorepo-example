import pino from "pino"

import env from "@/env"

export const logger = pino(
  pino.transport({
    targets: [
      { target: "pino-pretty", options: { colorize: true } },
      ...(env.LOKI_URL ? [{
        target: "pino-loki",
        options: {
          labels: { service: "service-org" },
              host: env.LOKI_URL,
            },
          },
        ]
      : []),
    ],
  }),
)
