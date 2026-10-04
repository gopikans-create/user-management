import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  function registerUser(e) {
    e.preventDefault();

    // Validation
    if (username === "" || email === "" || password === "") {
      setError("Please fill all fields");
      return;
    }

    // Email validation
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    // Store user
    const user = {
      username: username,
      email: email,
      password: password
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");

    navigate("/");
  }

  return (
    <div className="auth-page d-flex align-items-center justify-content-center min-vh-100">

      <div className="card border-0 shadow-lg rounded-4 p-4"
           style={{ width: "400px" }}>

        {/* Icon */}
        <div className="brand-icon mb-3">
          <i className="bi bi-person-plus-fill"></i>
        </div>

        <h2 className="text-center fw-bold">
          Create Account
        </h2>

        <p className="text-center text-muted mb-4">
          Register to continue
        </p>

        {/* Error */}
        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <form onSubmit={registerUser}>

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

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email
            </label>

            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>

              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold"
          >
            <i className="bi bi-person-plus me-2"></i>
            Register
          </button>

        </form>

        <p className="text-center mt-4 mb-0">
          Already have an account?{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/")}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;