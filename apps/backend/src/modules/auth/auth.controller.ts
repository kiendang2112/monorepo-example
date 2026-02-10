import Elysia from "elysia";

import { authService } from "./auth.service";
import { AuthSchema } from "@repo/shared-dto/schemas/auth";


export const AuthController = new Elysia().post("login", async ({ body }) => {
  const { email, password } = body;
  return await authService.login(email, password);
}, {
  body: AuthSchema.requestLogin,
  response: AuthSchema.responseLogin,
});
