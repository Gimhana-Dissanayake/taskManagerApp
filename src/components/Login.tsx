import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const user = useAuth();
  const [state, setState] = useState({ username: "", password: "" });
  const usernameChangeHandler = (value: string) => {
    setState((ps) => ({ ...ps, username: value }));
  };

  const passwordChangeHandler = (value: string) => {
    setState((ps) => ({ ...ps, password: value }));
  };
  const loginHandler = () => {
    user.login(state.username);
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
