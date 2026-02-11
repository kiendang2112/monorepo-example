/* eslint-disable security/detect-non-literal-fs-filename */
import { logger } from "@/libs/logger";
import { promises as fs } from 'node:fs';
import path from 'node:path';

interface Todo {
  id: number;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

class TodoService {
  private todosFilePath: string;

  constructor() {
    this.todosFilePath = path.join(__dirname, 'todo.json');
  }

  private async readTodosFromFile(): Promise<Todo[]> {
    try {
      const data = await fs.readFile(this.todosFilePath, 'utf8');
      return JSON.parse(data).toSorted((a: Todo, b: Todo) => b.id - a.id);
    } catch {
      throw new Error('Failed to read todos data 1');
    }
  }

  private async writeTodosToFile(todos: Todo[]): Promise<void> {
    try {
      await fs.writeFile(this.todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
    } catch {
      throw new Error('Failed to save todos data');
    }
  }

  async createTodo(title: string) {
    logger.info(`Create todo request received for title: ${title}`);
    const todos = await this.readTodosFromFile();
    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    todos.push(newTodo);
    await this.writeTodosToFile(todos);
    return newTodo;
  }

  async getTodos() {
    return this.readTodosFromFile();
  }

  async updateTodo(id: number, title: string) {
    logger.info(`Update todo request received for id: ${id} and title: ${title}`);
    const todos = await this.readTodosFromFile();
    const todo = todos.find(t => t.id === id);
    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const updatedTodo = {
      ...todo,
      title,
      updatedAt: new Date().toISOString(),
    };

    const newTodos: Todo[] = [
      ...todos, {
      ...updatedTodo,
      id: maxId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }];

    await this.writeTodosToFile(newTodos);
    return updatedTodo as Todo;
  }

  async deleteTodo(id: number) {
    logger.info(`Delete todo request received for id: ${id}`);
    const todos = await this.readTodosFromFile();
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const [deletedTodo] = todos.splice(todoIndex, 1);
    await this.writeTodosToFile(todos);
    return deletedTodo;
  }
}

export const todoService = new TodoService();
