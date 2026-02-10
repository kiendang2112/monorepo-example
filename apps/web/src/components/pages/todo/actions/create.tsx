import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import todoApi from "@/apis/todo";

export const CreateTodoAction = () => {

  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (title: string) => todoApi.createTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoApi.queryKey.getTodos() });
      setTitle('');
    },
  });

  const handleCreateTodo = (title: string) => {
    if (mutation.isPending) return;
    mutation.mutate(title);
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Add a new todo"
        className="flex-1 bg-gray-100 rounded-lg px-2 h-10"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button
        type="button"
        className="bg-blue-500 text-white rounded-lg h-10 w-10 text-center flex items-center justify-center"
        onClick={() => handleCreateTodo(title)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? <Loader2Icon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};
