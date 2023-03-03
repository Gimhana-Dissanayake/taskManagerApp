import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import "./Header.scss";
import { useAuth } from "../hooks/useAuth";

interface Props {
  handleOpen: () => void;
}

const Header: FC<Props> = (props) => {
  const AUTH = useAuth();

  return (
    <React.Fragment>
      <Row className="mb-2 mt-4 text-center">
        <Col md={4}></Col>

        <Col md={4}>
          <h5>Task Manager</h5>
        </Col>

        <Col md={4}></Col>
      </Row>
      <nav
        className="navbar navbar-expand-md breadcrumb  rounded"
        style={{ backgroundColor: "#997490" }}
      >
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="nav nav-pills d-flex w-100">
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="text-white" style={{ fontWeight: 500 }}>
                Todos List
              </div>
              <div className="d-flex">
                <button
                  className="add-todo-btn d-flex align-items-center rounded text-white"
                  onClick={props.handleOpen}
                >
                  Add New Todo
                </button>
                <FaSignOutAlt
                  className="ml-3 text-warning "
                  style={{ cursor: "pointer" }}
                  size={35}
                  onClick={() => {
                    AUTH.logout();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
