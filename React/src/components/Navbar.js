import { NavLink, withRouter } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-light bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Airlock
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <NavLink className="nav-link" aria-current="page" to="flights">
                Flights
              </NavLink>
            </li>
            {!props.isLoggedIn && (
              <li className="nav-item">
                <NavLink className="nav-link active" to="/login">
                  Login/Sign-Up
                </NavLink>
              </li>
            )}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Misc
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/about">
                    About Airlock
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/contact">
                    Contact Us!
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/reviews">
                    Read What People Think!
                  </NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled">Teleporting: Coming Soon</a>
            </li>
          </ul>
          {props.isLoggedIn && (
            <button className="btn btn-outline-light btn-dark">
              <NavLink className="nav-link active" to={`/${props.userType}`}>
                {`${props.login_name}'s profile`} 
              </NavLink>
            </button>
          )}
          <br />
          {props.isLoggedIn && (
            <button className="btn btn-dark">
              <NavLink
                className="nav-link active"
                to="/"
                onClick={props.onLogout}
              >
                Logout
              </NavLink>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
