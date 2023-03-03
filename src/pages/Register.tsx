import React, { useState } from "react";
import { FaExclamation } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import UserServices from "../service/UserServices";
import { toTitleCase } from "../util";
import Notification from "./../components/Notification";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const [isTouched, setIsTouched] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });

  const submitHandler = () => {
    setIsLoading(true);

    const registerDTO: any = {
      firstName: state.firstName,
      lastName: state.lastName,
      username: state.username,
      email: state.email,
    };
    UserServices.register(registerDTO)
      .then((res) => {
        Notification({
          isSuccess: true,
          message: `A new account was created for ${res.data.firstName}. Please check your email for password to sign in.`,
          closeTime: 10000,
        });
      })
      .catch((err) => {
        Notification({
          isSuccess: false,
          message: toTitleCase(err.message),
          closeTime: 10000,
          icon: FaExclamation,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    if (e.target.name === "firstName" && !e.target.value) {
      text = "First Name cannot be empty";
    } else if (e.target.name === "lastName" && !e.target.value) {
      text = "Last Name cannot be empty";
    } else if (e.target.name === "username" && !e.target.value) {
      text = "Username cannot be empty";
    } else if (e.target.name === "email" && !e.target.value) {
      text = "Email cannot be empty";
    }

    setIsTouched((ps: any) => ({
      ...ps,
      [e.target.name]: text,
    }));
  };

  const isFormValid = () => {
    return (
      isValidEmail() &&
      state.firstName &&
      state.lastName &&
      state.username &&
      state.email
    );
  };

  const isValidEmail = () => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return state.email.match(validRegex);
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
                  submitHandler();
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
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="firstName"
                    placeholder="First name"
                    onChange={stateInputHandler}
                    onFocus={setIsTouchedOnFocusHandler}
                    onBlur={setIsTouchedOnBlurHandler}
                  />
                  {isTouched.firstName ? (
                    <label
                      htmlFor="floatingInput"
                      className="mt-2 text-danger mb-0"
                      style={{ fontSize: 13 }}
                    >
                      {isTouched.firstName}
                    </label>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="lastName"
                    placeholder="Last name"
                    onChange={stateInputHandler}
                    onFocus={setIsTouchedOnFocusHandler}
                    onBlur={setIsTouchedOnBlurHandler}
                  />
                  {isTouched.lastName ? (
                    <label
                      htmlFor="floatingInput"
                      className="mt-2 text-danger mb-0"
                      style={{ fontSize: 13 }}
                    >
                      {isTouched.lastName}
                    </label>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingPassword"
                    name="email"
                    placeholder="Email"
                    onChange={stateInputHandler}
                    onFocus={setIsTouchedOnFocusHandler}
                    onBlur={setIsTouchedOnBlurHandler}
                  />
                  {isTouched.email ? (
                    <label
                      htmlFor="floatingInput"
                      className="mt-2 text-danger mb-0"
                      style={{ fontSize: 13 }}
                    >
                      {isTouched.email}
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
                  <span>Already have an account?</span>
                  <Link to="/login" className="ml-1">
                    Sign in
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

export default Register;
