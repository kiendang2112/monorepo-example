import api from "./api";

const queryKey = {
  root: ['todos'],
  getTodos: () => [...queryKey.root],
}

const getTodos = async () => {
  const response = await api.get('/api/todos');
  return response.data;
}

const createTodo = async (title: string) => {
  const response = await api.post('/api/todos', { title });
  return response.data;
}

const deleteTodo = async (id: number) => {
  const response = await api.delete(`/api/todos/${id}`);
  return response.data;
}


export default {
  queryKey,

  getTodos,
  createTodo,
  deleteTodo,
};
