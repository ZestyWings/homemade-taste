import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <div>
      <header className="header">
        <nav>
          <h1>Fausto Lopez</h1>
        </nav>
      </header>
      <nav className="navbar">
        <NavLink to="/" className="navbar-link">
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className="navbar-link">
              Profile
            </NavLink>
            <button className="navbar-link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-link">
              Login
            </NavLink>
            <NavLink to="/signup" className="navbar-link">
              Signup
            </NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
