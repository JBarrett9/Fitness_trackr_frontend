import { Link } from "react-router-dom";
import "./header.css";

const Header = (props) => {
  const logout = () => {
    props.setToken("");
    localStorage.removeItem("jwt");
  };

  return (
    <nav className="head">
      <span className="head-links">
        <span className="logo">Fitness Trac.kr</span>
        <Link to="/">HOME</Link>
        <Link to="/routines">ROUTINES</Link>
        <Link to="/activities">ACTIVITIES</Link>
      </span>
      <span className="head-user">
        {props.token ? (
          <a onClick={logout}>Logout</a>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/users/register">
            Register
          </Link>
        )}
      </span>
    </nav>
  );
};

export default Header;
