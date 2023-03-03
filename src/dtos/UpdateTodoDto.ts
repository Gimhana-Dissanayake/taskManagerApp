export interface UpdateTodoDTO {
  id: number;
  todoTitle: string;
  username: string;
  description: string;
  targetDate: string;
  done: boolean;
}
