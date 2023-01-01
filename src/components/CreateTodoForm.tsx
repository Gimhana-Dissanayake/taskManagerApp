import moment from "moment";
import React, { FC, useState } from "react";
import { CreateTodoDto } from "../dtos/CreateTodoDto";
import TodoService from "../service/TodoService";
import Validations from "../validations/Validations";

const initState: CreateTodoDto = {
  username: "",
  description: "",
  targetDate: new Date(),
  done: false,
};

const CreateTodoForm: FC = () => {
  const [state, setState] = useState(initState);
  const [validationResult, setValidationResult] = useState<
    { propertyName: string; error: string }[]
  >([]);
  const [successState, setSuccessState] = useState("");
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((ps) => ({
      ...ps,
      [e.target.name]: e.target.value,
    }));
  };

  const clear = () => {
    setValidationResult([]);
    setSuccessState("");
  };

  const sumbitHandler = () => {
    const valResult = Validations.validateCreateTodo(state);

    if (valResult.length) {
      return setValidationResult(valResult);
    }

    TodoService.createTodo(state)
      .then((val) => {
        setSuccessState("Todo created");
      })
      .catch((e) => {});
  };

  return (
    <div className="w-50 mt-5 mx-auto">
      {validationResult.length ? (
        validationResult.map((val, idx) => (
          <div className="alert alert-danger" key={idx}>
            {val.error}
          </div>
        ))
      ) : (
        <></>
      )}
      {successState ? (
        <div className="alert alert-success">{successState}</div>
      ) : (
        <></>
      )}
      <form className="form-group">
        <label htmlFor="descriptionFor">Description</label>
        <input
          type="text"
          className="form-control"
          id="descriptionFor"
          aria-describedby="emailHelp"
          placeholder="Enter description"
          onChange={inputChangeHandler}
          name="description"
          value={state.description}
          onFocus={clear}
        />
      </form>
      <div className="form-group">
        <label htmlFor="targetDateFor">Target Date</label>
        <input
          type="date"
          className="form-control"
          id="targetDateFor"
          placeholder="Enter date"
          onChange={inputChangeHandler}
          name="targetDate"
          value={moment(state.targetDate).format("YYYY-MM-DD")}
          onFocus={clear}
        />
      </div>

      <button className="btn btn-primary" onClick={sumbitHandler}>
        Submit
      </button>
    </div>
  );
};

export default CreateTodoForm;
