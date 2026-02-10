export enum TodoStatusEnum {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatusEnum;
  createdAt: string;
  updatedAt: string;
}
