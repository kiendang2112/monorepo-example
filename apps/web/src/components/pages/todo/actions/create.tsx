import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";



import { TodoSchema } from "@repo/shared-dto/schemas/todo";
import todoApi from "@/apis/todo";





export const CreateTodoAction = () => {

  const [title, setTitle] = useState('');
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof TodoSchema.createTodoRequest>>({
    resolver: zodResolver(TodoSchema.createTodoRequest),
    defaultValues: {
      title: "",
    },
  })


  const mutation = useMutation({
    mutationFn: (title: string) => todoApi.createTodo(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoApi.queryKey.getTodos() });
      setTitle('');
    },
  });

  const handleCreateTodo = async () => {
    if (mutation.isPending) return;
    const isValid = await trigger();
    if (!isValid) return;
    mutation.mutate(title);
  };

  return (
    <div className="flex-col gap-4">
      <form onSubmit={handleSubmit(handleCreateTodo)} className="flex w-full items-center gap-4">
        <input
          type="text"
          placeholder="Add a new todo"
          className="h-10 flex-1 rounded-lg bg-gray-100 px-2"
          {...register("title")}
        />
        <button
          type="submit"
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-center text-white"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? <Loader2Icon className="h-5 w-5" /> : <PlusIcon className="h-5 w-5" />}
        </button>
      </form>
      {errors.title && <span className="text-red-500 text-sm block">{errors.title.message}</span>}
    </div>
  )
};
