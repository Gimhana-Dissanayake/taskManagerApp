import React, { FC, useState } from "react";
import { Modal } from "react-bootstrap";
import { CreateTodoDTO } from "../dtos/CreateTodoDTO";

import { Todo } from "../models/Todo";
import TodoService from "../service/TodoService";
import DatePicker from "react-datepicker";
import { useAuth } from "../hooks/useAuth";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
  show: boolean;
  handleClose: () => void;
  addNewTodoList: (todo: Todo) => void;
}

const init: CreateTodoDTO = {
  todoTitle: "",
  username: "",
  description: "",
  targetDate: new Date().toUTCString(),
  done: false,
};

const AddTodoModel: FC<Props> = (props) => {
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState<CreateTodoDTO>(init);
  const [isTouched, setIsTouched] = useState({
    todoTitle: "",
    username: "",
    description: "",
    targetDate: new Date(),
  });

  const setLoadingHandler = (value: boolean) => {
    setIsLoading(value);
  };

  const setIsTouchedOnBlurHandler = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    let text = "";
    if (e.target.name === "username" && !e.target.value) {
      text = "Username cannot be empty";
    } else if (e.target.name === "description" && !e.target.value) {
      text = "Description cannot be empty";
    } else if (e.target.name === "todoTitle" && !e.target.value) {
      text = "Todo title cannot be empty";
    }

    setIsTouched((ps: any) => ({
      ...ps,
      [e.target.name]: text,
    }));
  };

  const setIsTouchedOnFocusHandler = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setIsTouched((ps: any) => ({
      ...ps,
      [e.target.name]: "",
    }));
  };

  const stateInputHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState((ps: any) => ({
      ...ps,
      [e.target.name]: e.target.value,
    }));
  };

  const setDateHandler = (date: Date) => {
    setState((ps: any) => ({
      ...ps,
      targetDate: date.toUTCString(),
    }));
  };

  const clearState = () => {
    setState(init);
  };

  const submitHandler = () => {
    setLoadingHandler(true);
    const createTodoDTO: CreateTodoDTO = {
      todoTitle: state.todoTitle,
      username: auth.user?.username || "",
      description: state.description,
      targetDate: state.targetDate,
      done: state.done,
    };

    TodoService.createTodo(createTodoDTO)
      .then((val) => {
        props.addNewTodoList(val.data);
      })
      .catch((e) => {
        props.handleClose();
        clearState();
      })
      .finally(() => {
        setLoadingHandler(false);
      });
  };

  const isFormValid = () => {
    return state.description && state.targetDate && state.todoTitle;
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.handleClose();
        clearState();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center">Add New Todo</h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span
              aria-hidden="true"
              onClick={() => {
                props.handleClose();
                clearState();
              }}
            >
              &times;
            </span>
          </button>
        </div>

        <div className="modal-body">
          <div>
            {isLoading ? <LoadingIndicator /> : <></>}

            <form>
              <div className="form-group">
                <label htmlFor="todoTitle">Todo Title</label>
                <input
                  type="text"
                  name="todoTitle"
                  className="form-control"
                  value={state?.todoTitle}
                  onChange={stateInputHandler}
                  onFocus={setIsTouchedOnFocusHandler}
                  onBlur={setIsTouchedOnBlurHandler}
                />
                {isTouched.todoTitle ? (
                  <div className="text-danger mt-1">{isTouched.todoTitle}</div>
                ) : (
                  <></>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  value={state?.description}
                  onChange={stateInputHandler}
                  onFocus={setIsTouchedOnFocusHandler}
                  onBlur={setIsTouchedOnBlurHandler}
                />
                {isTouched.description ? (
                  <div className="text-danger mt-1">
                    {isTouched.description}
                  </div>
                ) : (
                  <></>
                )}
              </div>

              <DatePicker
                selected={new Date(state.targetDate)}
                onChange={(date) => setDateHandler(date!)}
              />

              {/* <fieldset className="form-group mt-3">
                <div className="form-check">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      name="done"
                      className="form-check-input"
                      onChange={checkboxInputHandler}
                      checked={state.done}
                    />
                    Completed
                  </label>
                </div>
              </fieldset> */}
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            id="new-user-close"
            onClick={() => {
              props.handleClose();
              clearState();
            }}
          >
            Close
          </button>
          <button
            type="button"
            className={`btn btn-primary ${!isFormValid() && "disabled"}`}
            onClick={() => {
              if (isFormValid()) {
                submitHandler();
                props.handleClose();
                clearState();
              }
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

// let firstName = "";
// let lastName = "";
// let username = "";
// let email = "";

// if (isFormValid()) {
//   if (!state.firstName) {
//     firstName = "First Name cannot be empty";
//   }
//   if (!state.lastName) {
//     lastName = "Last Name cannot be empty";
//   }
//   if (!state.username) {
//     username = "Username cannot be empty";
//   }
//   if (!state.email) {
//     email = "Email cannot be empty";
//   }

//   return setIsTouched((ps: any) => ({
//     ...ps,
//     firstName,
//     lastName,
//     username,
//     email,
//   }));
// }

export default AddTodoModel;
