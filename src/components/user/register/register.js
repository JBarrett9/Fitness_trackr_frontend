import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authentication";
import "../user.css";

const Register = (props) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === password2 && password.length > 8) {
      await registerUser(
        userName,
        password,
        props.setToken,
        setError,
        navigate
      );
    }
  };

  return (
    <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
      <h2>New User</h2>
      <span>
        <label>Username:</label>
        <input onChange={(e) => setUsername(e.target.value)} />
      </span>
      <span>
        <label>Password:</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </span>
      <span>
        <label>Confirm Password:</label>
        <input type="password" onChange={(e) => setPassword2(e.target.value)} />
      </span>
      <div className="user-form-buttons">
        <button>Register</button>
        <p>
          Have an account? <Link to="/users/login">Login</Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
