import Elysia from "elysia";
import { AuthController } from "./auth.controller";

export const AuthModule = new Elysia({ prefix: "" }).use(AuthController);
