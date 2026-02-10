'use client';
import { useQuery } from "@tanstack/react-query";
import type { Todo } from "@repo/shared-dto/types/todo";
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";
import todoApi from "@/apis/todo";
import { CreateTodoAction } from "@/components/pages/todo/actions/create";
import { RemoveTodoAction } from "@/components/pages/todo/actions/remove";

export default function Page() {

  const { data, isLoading, error } = useQuery({
    queryKey: todoApi.queryKey.getTodos(),
    queryFn: todoApi.getTodos,
  });



  if (error) {
    return <div className="container mx-auto px-4">
      <div className="bg-white p-4 mt-24 rounded-2xl shadow space-y-4">
        <div className="flex items-center gap-4">
          Error: {error.message}
        </div>
      </div>
    </div>;
  }

  if (isLoading) {
    return <div className="container mx-auto px-4">
      <div className="bg-white p-4 mt-24 rounded-2xl shadow space-y-4">
        <div className="flex items-center gap-4">
          Loading...
        </div>
      </div>
    </div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white p-4 mt-24 rounded-2xl shadow space-y-4">
        <CreateTodoAction />
        <div>
          <ul className="flex items-center gap-4">
            <li className="text-sm font-medium  px-2 py-1 rounded-lg bg-blue-100 text-blue-600">
              All
            </li>
            <li className="text-sm font-medium text-gray-600 px-2 py-1 rounded-lg ">
              Active
            </li>
            <li className="text-sm font-medium text-gray-600 px-2 py-1 rounded-lg ">
              Completed
            </li>
          </ul>
        </div>
        <div className="divide-y divide-gray-200">
          {data?.map((todo: Todo, index: number) => (
            <div key={index} className="py-3 flex items-center space-x-4">
              <input type="checkbox" className="size-4" />
              <span className="text-sm font-medium text-gray-600 flex-1 line-clamp-1">
                {todo.title}
              </span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-sm font-medium flex items-center justify-center text-blue-600"
                >
                  <PencilIcon strokeWidth={2.3} className="size-4.5" />
                </button>
                <RemoveTodoAction id={todo.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


