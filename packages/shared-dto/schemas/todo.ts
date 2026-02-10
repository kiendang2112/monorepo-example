import z from "zod";

export const TodoSchema = {
  createTodoRequest: z.object({
    title: z.string('Title is required'),
  }),
  createTodoResponse: z.object({
    id: z.number('ID is required'),
    title: z.string('Title is required'),
  }),
  updateTodoRequest: z.object({
    title: z.string('Title is required'),
  }),
  updateTodoResponse: z.object({
    id: z.number('ID is required'),
    title: z.string('Title is required'),
  }),
  deleteTodoRequest: z.object({
    id: z.number('ID is required'),
  }),
  getTodosResponse: z.array(z.object({
    id: z.number('ID is required'),
    title: z.string('Title is required'),
    status: z.string('Status is required'),
  })),
}
