import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpdateTodoDto } from "../dtos/UpdateTodoDto";
import TodoService from "../service/TodoService";
import Validations from "../validations/Validations";

const initState: UpdateTodoDto = {
  id: null,
  username: "",
  description: "",
  targetDate: new Date(),
  done: false,
};

const UpdateTodoForm: FC = () => {
  const [state, setState] = useState(initState);
  const params = useParams() as { id: string };
  const [validationResult, setValidationResult] = useState<
    { propertyName: string; error: string }[]
  >([]);
  const [successState, setSuccessState] = useState("");

  useEffect(() => {
    TodoService.getTodosById(Number(params.id)).then((res) => {
      setState(res.data);
    });
  }, [params.id]);

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

    TodoService.updateTodo(Number(state.id), state)
      .then((val) => {
        console.log("UPPPD");
      })
      .catch((e) => {});
  };

  return (
    <form className="w-50 mt-5 mx-auto">
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
      <div className="form-group">
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
      </div>
      <div className="form-group">
        <label htmlFor="targetDateFor">Target Date</label>
        <input
          type="date"
          className="form-control"
          id="targetDateFor"
          placeholder="Enter Date"
          onChange={inputChangeHandler}
          name="targetDate"
          value={moment(state.targetDate).format("YYYY-MM-DD")}
          onFocus={clear}
        />
      </div>

      <button className="btn btn-primary" onClick={sumbitHandler}>
        Submit
      </button>
    </form>
  );
};

export default UpdateTodoForm;
