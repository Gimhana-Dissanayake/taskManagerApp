import React from "react";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <div>
      Welcome. <Link to="/auth/list">List todos</Link>
    </div>
  );
};

export default WelcomeScreen;
