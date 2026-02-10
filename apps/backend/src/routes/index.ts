import { Elysia } from "elysia"
import { TodoModule } from "@/modules/todo/todo.module"

export const modules = [TodoModule]

export const API_PREFIX = "/api"

export const apiRouter = new Elysia({
  prefix: API_PREFIX,
})

for (const route of modules) apiRouter.use(route)
