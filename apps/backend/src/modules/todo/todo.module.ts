import Elysia from "elysia";
import { TodoController } from "./todo.controller";

export const TodoModule = new Elysia({ prefix: "/todos" }).use(TodoController);
