import * as Sentry from "@sentry/bun"

Sentry.init({ dsn: Bun.env.SENTRY_DSN || "" })
