import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../models/Todo";
import TodoService from "../service/TodoService";

const TodoList = () => {
  const [state, setState] = useState<{
    list: Todo[];
    deletedTodo: Todo | null | undefined;
  }>({
    list: [],
    deletedTodo: null,
  });

  useEffect(() => {
    TodoService.getTodos()
      .then((res) => {
        setState((ps) => {
          return { ...ps, list: res.data };
        });
      })
      .catch((e) => {
        console.log("ERR ", e);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState((ps) => {
        return { ...ps, deletedTodo: null };
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, [state.deletedTodo]);

  const onDeleteSuccessHandler = (
    list: Todo[],
    deletedTodo: Todo | null | undefined
  ) => {
    setState((ps) => {
      return { ...ps, list, deletedTodo: deletedTodo };
    });
  };

  const navRef = useNavigate();

  return (
    <div>
      <h1>List Todos</h1>
      {state.deletedTodo ? (
        <div className="alert alert-success">
          Todo with id {state.deletedTodo.id} was deleted successfully
        </div>
      ) : (
        <></>
      )}

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>

            <th>Due date</th>
            <th>Is completed?</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.list.map((data, idx) => (
            <tr key={idx}>
              <td>{data.id}</td>
              <td>{data.description}</td>

              <td>{new Date(data.targetDate).toISOString()}</td>
              <td>{data.done ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    navRef(`/auth/update/${data.id}`);
                  }}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    TodoService.deleteTodo(data.id)
                      .then((removedTodo) => {
                        const deletedTodo = removedTodo.data;

                        const remainingTodos = [...state.list].filter(
                          (t) => t.id !== deletedTodo.id
                        );
                        onDeleteSuccessHandler(remainingTodos, deletedTodo);
                      })
                      .catch((e) => {});
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="btn btn-primary"
        onClick={() => {
          navRef(`/auth/create`);
        }}
      >
        Create Todo
      </button>
    </div>
  );
};

export default TodoList;
