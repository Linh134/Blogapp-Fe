import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <div className="app font-primary">
      <div className="container">
        <div className="auth">
          <h1 className="h1">Register</h1>
          <form className="form">
            <input
              className="form input"
              required
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              className="form input"
              required
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              className="form button"
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Signup
            </button>
            {error && <p className="form p">{error}</p>}
            <span className="form span">
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
