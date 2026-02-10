import { TodoStatusEnum } from "../types/todo";

export const TodoStatuses: Record<TodoStatusEnum, string> = {
  [TodoStatusEnum.PENDING]: 'pending',
  [TodoStatusEnum.COMPLETED]: 'completed',
}
