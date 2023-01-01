import { Link, Navigate, useOutlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";

export const ProtectedLayout = () => {
  const { user, logout } = useAuth();
  const outlet = useOutlet();
  const navRef = useNavigate();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <h3
          onClick={() => {
            navRef("/auth/welcome");
          }}
        >
          LOGO
        </h3>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link to="/auth/list" className="nav-link">
                Todos
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item ">
              <Link
                className="nav-link"
                onClick={() => {
                  logout();
                  navRef("/");
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {outlet}
      <Footer />
    </div>
  );
};
