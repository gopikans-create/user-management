import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function loginUser(e) {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Please fill all fields");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      setError("No registered user found");
      return;
    }

    if (
      storedUser.username === username &&
      storedUser.password === password
    ) {
      localStorage.setItem("loggedIn", "true");

      navigate("/dashboard");
    } else {
      setError("Incorrect username or password");
    }
  }

  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100">

      <div
        className="card border-0 shadow-lg rounded-4 p-4"
        style={{ width: "400px" }}
      >

        <div className="brand-icon mb-3">
          <i className="bi bi-person-circle"></i>
        </div>

        <h2 className="text-center fw-bold">
          Welcome Back
        </h2>

        <p className="text-center text-muted mb-4">
          Login to your account
        </p>

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <form onSubmit={loginUser}>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Username
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Password
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>

              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
          >
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </button>

        </form>

        <p className="text-center mt-4 mb-0">
          Don't have an account?{" "}

          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;