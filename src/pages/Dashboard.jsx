import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check login
    if (localStorage.getItem("loggedIn") !== "true") {
      navigate("/");
      return;
    }

    fetchUsers();
  }, []);

  // Fetch users from API
  function fetchUsers() {
    fetch("https://api.slingacademy.com/v1/sample-data/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }

  // Logout
  function logout() {
    localStorage.removeItem("loggedIn");
    navigate("/");
  }

  // Search users
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.first_name} ${user.last_name}`;

    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="dashboard-bg min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark shadow-sm">
        <div className="container-fluid px-4">

          <span className="navbar-brand fw-bold">
            <i className="bi bi-people-fill me-2"></i>
            User Management
          </span>

          <button
            className="btn btn-outline-light"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Logout
          </button>

        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-5">

        {/* Heading */}
        <div className="mb-4">
          <h1 className="fw-bold">Users Dashboard</h1>

          <p className="text-muted">
            Search and manage users
          </p>
        </div>

        {/* Search */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">

          <div className="card-body p-4">

            <div className="input-group">

              <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
              </span>

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search users by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">

            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <p className="mt-3 text-muted">
              Loading users...
            </p>

          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert alert-danger">

            <i className="bi bi-exclamation-triangle me-2"></i>

            {error}

          </div>
        )}

        {/* Users */}
        {!loading && !error && (

          <div className="row g-4">

            {filteredUsers.map((user) => (

              <div
                className="col-sm-6 col-lg-4"
                key={user.id}
              >

                <div className="card user-card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body text-center p-4">

                    {/* Profile Image */}
                    <img
                      src={user.profile_picture}
                      alt={`${user.first_name} ${user.last_name}`}
                      className="user-image mb-3"
                    />

                    {/* Name */}
                    <h5 className="fw-bold">
                      {user.first_name} {user.last_name}
                    </h5>

                    {/* Email */}
                    <p className="text-muted mb-2">
                      {user.email}
                    </p>

                    {/* Job */}
                    <span className="badge bg-primary mb-3">
                      {user.job}
                    </span>

                    {/* Details Button */}
                    <button
                      className="btn btn-dark w-100"
                      onClick={() =>
                        navigate(`/user/${user.id}`)
                      }
                    >
                      <i className="bi bi-eye me-2"></i>
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            ))}

            {/* No Search Result */}
            {filteredUsers.length === 0 && (
              <div className="col-12">

                <div className="alert alert-warning text-center">
                  No users found.
                </div>

              </div>
            )}

          </div>

        )}

      </div>

    </div>
  );
}

export default Dashboard;