import { RedisClient } from "bun"

import env from "@/env"

export const redisClient = new RedisClient(env.REDIS_URL)

await redisClient.connect()
