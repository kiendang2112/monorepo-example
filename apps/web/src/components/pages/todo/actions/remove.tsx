import { Trash2Icon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoApi from "@/apis/todo";

export const RemoveTodoAction = ({ id }: { id: number }) => {

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoApi.queryKey.getTodos() });
    },
  });


  return (
    <button
      type="button"
      className="text-sm font-medium flex items-center justify-center text-red-500"
      onClick={() => {
        mutation.mutate(id);
      }}
    >
      <Trash2Icon strokeWidth={2.3} className="size-4.5" />
    </button>
  );
};
