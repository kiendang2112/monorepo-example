import Elysia from "elysia";

import { todoService } from "./todo.service";
import { TodoSchema } from "@repo/shared-dto/schemas/todo";
import { CommonSchema } from "@repo/shared-dto/schemas/common";

export const TodoController = new Elysia()
  .get(
    "",
    async () => {
      return await todoService.getTodos();
    },
    {
      tags: ['todos'],
      response: TodoSchema.getTodosResponse,
    }
  )
  .post(
    "",
    async ({ body }) => {
      const { title } = body;
      return await todoService.createTodo(title);
    },
    {
      tags: ['todos'],
      body: TodoSchema.createTodoRequest,
      response: TodoSchema.createTodoResponse,
    }
  )
  .put(
    ":id",
    async ({ body, params }) => {
      const { id } = params;
      const { title } = body;

      return await todoService.updateTodo(id, title);
    },
    {
      tags: ['todos'],
      body: TodoSchema.updateTodoRequest,
      params: CommonSchema.idParams,
      response: TodoSchema.updateTodoResponse,
    }
  ).delete(
    ":id",
    async ({ params }) => {
      const { id } = params;
      return await todoService.deleteTodo(id);
    },
    {
      tags: ['todos'],
      params: CommonSchema.idParams,
    }
  );
