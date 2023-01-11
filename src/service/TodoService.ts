import axios from "axios";
import { BASE_URL } from "../constants";
import { CreateTodoDto } from "../dtos/CreateTodoDto";
import { UpdateTodoDto } from "../dtos/UpdateTodoDto";

class TodoService {
  getTodos() {
    return axios.get(`${BASE_URL}/jimmy/todos`);
  }

  getTodosById(id: number) {
    return axios.get(`${BASE_URL}/jimmy/todos/${id}`);
  }

  deleteTodo(id: number) {
    return axios.delete(`${BASE_URL}/jimmy/todos/${id}`);
  }

  updateTodo(id: number, todo: UpdateTodoDto) {
    return axios.put(`${BASE_URL}/jimmy/todos/${id.toString()}`, todo);
  }

  createTodo(todo: CreateTodoDto) {
    return axios.post(`${BASE_URL}/jimmy/todos`, todo);
  }
}

export default new TodoService();
