import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import AddTodoModel from "../components/AddTodoModel";
import EditTodoModel from "../components/EditTodoModel";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";
import { useAuth } from "../hooks/useAuth";
import { Todo } from "../models/Todo";
import TodoService from "../service/TodoService";

const Dashboard = () => {
  const auth = useAuth();

  const [data, setData] = useState<{
    todos: Todo[];
    selectedTodo: Todo | null;
    isLoading: boolean;
    searchTerm: string;
  }>({ todos: [], selectedTodo: null, isLoading: false, searchTerm: "" });

  useEffect(() => {
    isLoadingHandler(true);
    TodoService.getTodos(auth.user?.username || "")
      .then((response) => {
        setData((ps) => ({ ...ps, todos: response.data }));
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        isLoadingHandler(false);
      });
  }, [auth.user?.username]);

  const isLoadingHandler = (value: boolean) => {
    setData((ps) => ({ ...ps, isLoading: value }));
  };

  const setEditedTodo = (todo: Todo) => {
    const todosClone = [...data.todos];
    const idx = todosClone.map((u) => u.id).indexOf(todo.id);
    todosClone[idx] = todo;
    setData((ps) => ({ ...ps, todos: todosClone }));
  };

  const addNewTodoList = (todo: Todo) => {
    const todosClone = [...data.todos, todo];
    setData((ps) => ({ ...ps, todos: todosClone }));
  };

  const removeTodoFromList = (id: number) => {
    const todosClone = [...data.todos];
    const updatedList = todosClone.filter((val) => val.id !== id);
    setData((ps) => ({ ...ps, todos: updatedList }));
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [open, setOpen] = useState(false);

  const handleShut = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const setSelectedTodo = (todo: Todo) => {
    setData((ps) => ({ ...ps, selectedTodo: todo }));
  };

  return (
    <React.Fragment>
      <Header handleOpen={handleOpen} />
      {data.isLoading ? (
        <LoadingIndicator />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">targetDate</th>
              <th scope="col">Done</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.todos.map((todo) => {
              return (
                <tr key={todo.id}>
                  <th scope="row">{todo.id}</th>
                  <th>{todo.todoTitle}</th>
                  <td>{todo.description}</td>
                  <td>{moment(todo.targetDate).format("ll")}</td>
                  <td>{todo.done ? "completed" : "not completed"}</td>
                  <td>
                    <span>
                      <FaEdit
                        className="text-warning mr-3"
                        onClick={(e) => {
                          handleShow();
                          setSelectedTodo(todo);
                          e.stopPropagation();
                        }}
                      />
                      <FaTrash
                        className="text-danger"
                        onClick={(e) => {
                          isLoadingHandler(true);
                          TodoService.deleteTodo(todo.id)
                            .then(() => {
                              removeTodoFromList(todo.id);
                            })
                            .catch(() => {
                              console.log("ERROR");
                            })
                            .finally(() => {
                              isLoadingHandler(false);
                            });
                          e.stopPropagation();
                        }}
                      />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <EditTodoModel
        handleClose={handleClose}
        setEditedTodo={setEditedTodo}
        show={show}
        selectedTodo={data.selectedTodo}
      />

      <AddTodoModel
        handleClose={handleShut}
        show={open}
        addNewTodoList={addNewTodoList}
      />
    </React.Fragment>
  );
};

export default Dashboard;
