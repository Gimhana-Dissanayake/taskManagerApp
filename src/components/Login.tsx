import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppUser } from "../constants";
import { useAuth } from "../hooks/useAuth";
import AuthService from "../service/AuthService";

const Login = () => {
  const AUTH = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState({ username: "", password: "" });
  const usernameChangeHandler = (value: string) => {
    setState((ps) => ({ ...ps, username: value }));
  };

  const passwordChangeHandler = (value: string) => {
    setState((ps) => ({ ...ps, password: value }));
  };
  const loginHandler = async () => {
    const creds = { username: state.username, password: state.password };

    try {
      const response = await AUTH.login(creds);
      const user: AppUser = {
        username: state.username,
        token: response.data.token || null,
      };
      AUTH.setAppUser(user);
      AuthService.setUpAxiosInterceptors(user);
      navigate("/auth/welcome", { replace: true });
    } catch (e) {
      console.log("ERROR");
    }
  };
  return (
    <div>
      <input
        type="text"
        name="username"
        value={state.username}
        onChange={(e) => {
          usernameChangeHandler(e.target.value);
        }}
      />
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={(e) => {
          passwordChangeHandler(e.target.value);
        }}
      />
      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;
