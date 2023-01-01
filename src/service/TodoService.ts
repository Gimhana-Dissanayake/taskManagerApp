import axios from "axios";
import { CreateTodoDto } from "../dtos/CreateTodoDto";
import { UpdateTodoDto } from "../dtos/UpdateTodoDto";

class TodoService {
  getTodos() {
    let username = "Gim";
    let password = "gim";

    let basicAuthHeader = "Basic " + window.btoa(username + ":" + password);

    return axios.get("http://localhost:8081/users/username/todos", {
      headers: {
        authorization: basicAuthHeader,
      },
    });
  }

  getTodosById(id: number) {
    return axios.get(`http://localhost:8081/users/username/todos/${id}`);
  }

  deleteTodo(id: number) {
    return axios.delete(`http://localhost:8081/users/username/todos/${id}`);
  }

  updateTodo(id: number, todo: UpdateTodoDto) {
    return axios.put(
      `http://localhost:8081/users/username/todos/${id.toString()}`,
      todo
    );
  }

  createTodo(todo: CreateTodoDto) {
    return axios.post(`http://localhost:8081/users/username/todos`, todo);
  }
}

export default new TodoService();
