import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/authentication";

const Login = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(userName, password, props.setToken, setError, navigate);
  };
  return (
    <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>Login</h2>
      <span>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} />
      </span>
      <span>
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </span>
      <div className="user-form-buttons">
        <button>Login</button>
        <p>
          Need an account? <Link to="/users/register">Register</Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
