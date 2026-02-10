import z from "zod"

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),

  API_PORT: z.coerce.number().default(9001),
  LOKI_URL: z.string().nullable().default(null),
})

export default envSchema.parse(Bun.env)
