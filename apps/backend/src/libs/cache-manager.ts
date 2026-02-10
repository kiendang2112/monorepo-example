import { redisClient } from "@/libs/redis"

export const set = async <T = unknown>(key: string, value: T, ttl: number) => {
  return Promise.all([redisClient.set(key, JSON.stringify(value)), redisClient.expire(key, ttl)])
}

export const getOrSet = async <T = unknown>(key: string, callback: () => Promise<T>, ttl: number) => {
  const cached = await redisClient.get(key)
  if (cached) return cached

  const value = await callback()
  await set<T>(key, value as T, ttl)
  return value
}
