export interface UpdateTodoDto {
  id: number | null;
  username: string;
  description: string;
  targetDate: Date;
  done: boolean;
}
