import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <React.Fragment>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container ">
        <Link to="/auth/dashboard" className="more-link rounded">
          Go Back
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
