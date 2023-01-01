import { Navigate, useOutlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Footer from "./Footer";

export const HomeLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  const navRef = useNavigate();

  if (user) {
    return <Navigate to="/auth/welcome" replace />;
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
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item ">
              <Link to="/login" className="nav-link">
                Login
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
