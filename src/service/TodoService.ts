import axios from "axios";
import { BASE_URL } from "../constants";
import { CreateTodoDTO } from "../dtos/CreateTodoDTO";
import { EditTodoDTO } from "../dtos/EditTodoDTO";

class TodoService {
  getTodos(username: string) {
    return axios.get(`${BASE_URL}/todo/${username}`);
  }

  deleteTodo(id: number) {
    return axios.delete(`${BASE_URL}/todo/${id}`);
  }

  updateTodo(todo: EditTodoDTO) {
    return axios.put(`${BASE_URL}/todo/update`, todo);
  }

  createTodo(todo: CreateTodoDTO) {
    return axios.post(`${BASE_URL}/todo/add`, todo);
  }
}

const obj = new TodoService();

export default obj;
