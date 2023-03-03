import React, { useState } from "react";
import { FaExclamation } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import { useAuth } from "../hooks/useAuth";
import User from "../models/User";
import AuthService from "../service/AuthService";
import Notification from "./../components/Notification";

const Login = () => {
  const AUTH = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [isTouched, setIsTouched] = useState({
    username: "",
    password: "",
  });

  const loginHandler = async () => {
    setIsLoading(true);

    const creds = { username: state.username, password: state.password };

    try {
      const response = await AUTH.login(creds);
      setIsLoading(false);
      const token = response.headers["jwt-token"];
      const user: User = { ...response.data, token: token };

      AUTH.setAppUser(user);
      AuthService.setUpAxiosInterceptors(user);
      navigate("/auth/dashboard", { replace: true });
    } catch (e: any) {
      console.log("ERRROR ", e);
      setIsLoading(false);
      Notification({
        isSuccess: false,
        message: "Invalid credentials",
        icon: FaExclamation,
      });
    }
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

  const setIsTouchedOnFocusHandler = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    setIsTouched((ps: any) => ({
      ...ps,
      [e.target.name]: "",
    }));
  };

  const setIsTouchedOnBlurHandler = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    let text = "";
    if (e.target.name === "username" && !e.target.value) {
      text = "Username cannot be empty";
    } else if (e.target.name === "password" && !e.target.value) {
      text = "Password cannot be empty";
    }

    setIsTouched((ps: any) => ({
      ...ps,
      [e.target.name]: text,
    }));
  };

  const isFormValid = () => {
    return state.username && state.password;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign up
              </h5>
              <form
                onSubmit={(e) => {
                  loginHandler();
                  e.preventDefault();
                }}
              >
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="username"
                    placeholder="Username"
                    onChange={stateInputHandler}
                    onFocus={setIsTouchedOnFocusHandler}
                    onBlur={setIsTouchedOnBlurHandler}
                  />
                  {isTouched.username ? (
                    <label
                      htmlFor="floatingInput"
                      className="mt-2 text-danger mb-0"
                      style={{ fontSize: 13 }}
                    >
                      {isTouched.username}
                    </label>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    placeholder="Password"
                    onChange={stateInputHandler}
                    onFocus={setIsTouchedOnFocusHandler}
                    onBlur={setIsTouchedOnBlurHandler}
                  />
                  {isTouched.password ? (
                    <label
                      htmlFor="floatingInput"
                      className="mt-2 text-danger mb-0"
                      style={{ fontSize: 13 }}
                    >
                      {isTouched.password}
                    </label>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="d-grid mt-4">
                  <button
                    className={`btn btn-primary btn-login text-uppercase fw-bold ${
                      !isFormValid() && "disabled"
                    }`}
                    type="submit"
                  >
                    Sign up
                  </button>
                </div>
                {isLoading && <LoadingIndicator />}
                <div
                  className="mt-4 d-flex justify-content-center"
                  style={{ fontSize: 13 }}
                >
                  <span>Don't have an account ?</span>
                  <Link to="/register" className="ml-1">
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
